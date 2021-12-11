import React, { Component } from 'react';
import { Container, View } from 'native-base';
import { Text, Image, Linking } from 'react-native';
import style from '../styles/style';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

export default class NewsDetails extends Component {
  render() {
    const newsDetails = this.props.navigation.getParam('selectedNews');
    const category = this.props.navigation.getParam('category');
    return (
      <Container>
        <ScrollView>
          <View>
            <Image source={{ uri: newsDetails.image }} style={style.detailsThumbNail} />
            <View  style={style.backButton}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Icon name="md-arrow-round-back" type="iconicon" size={25} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ padding: 20 }}>
            <Text style={[style.detailsHeadLine, style.bold, style.justified]}>{newsDetails.headline}</Text>
            <View style={[style.spaceBetween, {marginTop: 10}]}>
              <View style={style.flexRow}>
                <Text style={[style.primaryFont, style.fontGrey]}>{newsDetails.source}</Text>
                <View style={[style.center, {paddingHorizontal: 8}]}>
                  <FontAwesomeIcon name="circle" size={6} color='#7f8fa6'></FontAwesomeIcon>
                </View>
                <Text style={[style.fontGrey, style.primaryFont]}>{moment(newsDetails.timestamp).local().startOf('hour').fromNow()}</Text>
              </View>

              <View style={[style.badge]}>
                <Text style={[style.fontWhite, style.italic, {fontSize: 11}]}>{category}</Text>
              </View>
            </View>
            <View style={style.horizontalDivider}></View>
            <View style={style.spaceBetween}>
              <Text style={style.link} onPress={ ()=>{ Linking.openURL(newsDetails.link)}}>Read Full Article</Text>
            </View>
            <Text style={[style.justified, style.primaryFont, {marginTop: 10}]}>{newsDetails.description}</Text>
          </View>
        </ScrollView>
      </Container>
    );
  }
}
