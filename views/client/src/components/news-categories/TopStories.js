import React, { Component } from 'react';
import { Text, FlatList, ScrollView, RefreshControl } from 'react-native';
import { Container, ListItem, Thumbnail, Left, Body, View, Spinner } from 'native-base';
import * as DbService from '../../services/DbService';
import style from '../../styles/style';
import Slider from '../Slider';
import moment from 'moment';
import { debounce } from 'lodash';

class TopStories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      limit: 10,
      lastArticleId: '',
      isSpinnerShow: false,
      hasMore: true,
      newsList: []
    }
  }

  componentWillMount() {
    this.getData(this.state.limit);
  }

  refreshHandler = async () => {
    await this.setState({ refreshing: true });
    await this.getData(this.state.limit);
  }

  getData = debounce(async (limit, lastArticleId) => {
    if (this.state.refreshing) {
      await this.setState({
        hasMore: true,
        newsList: []
      });
    }
    let res = await DbService.readData('/news/topstories', limit, lastArticleId);
    if (lastArticleId) {
      res.pop();
    }
    if (res.length < limit-1) {
      this.setState({
        hasMore: false
      });
    }
    if (!res.length) {
      return;
    }
    let id = res[0].id;
    let updatedList = [...this.state.newsList];
    updatedList = updatedList.concat(res);
    this.setState({
      newsList: updatedList,
      lastArticleId: id,
      isSpinnerShow: false,
      refreshing: false
    });
  }, 1000);

  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;
  }

  renderItem = ({ item }) => {
    return (
      <ListItem thumbnail onPress={() => this.props.navigation.push('NewsDetails', { selectedNews: item, category: 'Top Stories' })} >
        <Left>
          <Thumbnail square style={style.listThumbNail} source={{ uri: item.image }} />
        </Left>
        <Body style={{paddingHorizontal: 5}}>
          <Text style={[style.justified, style.bold]}>{item.headline}</Text>
          <Text style={[style.fontGrey, style.primaryFont]}>{moment(item.timestamp).local().startOf('hour').fromNow()}</Text>
        </Body>
      </ListItem>
    );
  };

  render() {
    return (
      <Container>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.refreshHandler}
            />
          }
          onScroll={async ({ nativeEvent }) => {
            if (this.isCloseToBottom(nativeEvent) && this.state.hasMore) {
              await this.setState({
                isSpinnerShow: true
              });
              this.getData(this.state.limit, this.state.lastArticleId);
            }
          }}
        >
          <Slider data={this.state.newsList.slice(0, 5)} navigation={this.props.navigation}></Slider>
          <View style={[style.bold, style.marginLeft20]}>
            {this.state.newsList && <Text style={[style.bold, style.headerTitle]}>Latest</Text>}
          </View>
          <View style={{ marginBottom: 20 }}>
            <FlatList
              data={this.state.newsList.slice(5)}
              renderItem={this.renderItem}
              keyExtractor={item => item.id}
            >
            </FlatList>
            {this.state.isSpinnerShow && this.state.hasMore && !this.state.refreshing  && <Spinner color='black' />}
          </View>
        </ScrollView>
      </Container>
    )
  }
}
export default TopStories;
