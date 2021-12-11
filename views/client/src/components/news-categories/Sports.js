import React, { Component } from 'react';
import { Text, FlatList, RefreshControl } from 'react-native';
import { Container, ListItem, Thumbnail, Left, Body, Spinner, Right } from 'native-base';
import * as DbService from '../../services/DbService';
import style from '../../styles/style';
import moment from 'moment';

class World extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      limit: 10,
      isSpinnerShow: false,
      hasMore: true,
      lastArticleId: '',
      newsList: []
    }
  }
  async componentWillMount() {
    this.getData(this.state.limit);
  }
  refreshHandler = async () => {
    await this.setState({refreshing: true});
    await this.getData(this.state.limit);
    await this.setState({refreshing: false});
  }
  getData = async (limit, lastArticleId) => {
    if(this.state.refreshing) {
      await this.setState({
        hasMore: true,
        newsList: []
      });
    }
    let res = await DbService.readData('/news/sports', limit, lastArticleId);
    if(lastArticleId) {
      res.pop();
    }
    if(res.length<limit-1) {
      this.setState({
        hasMore: false
      });
    }
    if(!res.length) {
      return;
    }
    let id = res[0].id;
    let updatedList = [...this.state.newsList];
    updatedList = updatedList.concat(res);
    this.setState({
      newsList: updatedList,
      lastArticleId: id,
      isSpinnerShow: false
    });
  }
  renderItem = ({item}) => {
    return (
      <ListItem thumbnail onPress={() => this.props.navigation.push('NewsDetails', { selectedNews: item, category: 'Sports' })} >
        <Left>
          <Thumbnail square style={style.listThumbNail} source={{ uri: item.image }} />
        </Left>
        <Body style={{paddingHorizontal: 5}}>
          <Text style={[style.justified, style.bold]}>{item.headline}</Text>
          <Text style={style.fontGrey}>{moment(item.timestamp).local().startOf('hour').fromNow()}</Text>
        </Body>
      </ListItem>
    );
  };
  render() {
    return (
      <Container>
        <FlatList
          data={this.state.newsList}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.refreshHandler}
            />
          }
          onEndReachedThreshold={0.7}
          onEndReached={()=>{
            if(this.state.hasMore) {
              this.setState({isSpinnerShow: true});
              this.getData(this.state.limit,this.state.lastArticleId);
            }
          }}
        >
        </FlatList>
        {this.state.isSpinnerShow && this.state.hasMore && !this.state.refreshing  && <Spinner color='black' />}
      </Container>
    )
  }
}
export default World;
