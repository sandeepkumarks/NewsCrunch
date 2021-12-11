import React from 'react';
import { Text, ScrollView, View, ImageBackground, TouchableOpacity } from 'react-native';
import style from '../styles/style';
import moment from 'moment';

const fetchList = (data,navigation) => {
  let sliderList = data.map(each => {
    return (
      <TouchableOpacity key={each.id} onPress={() => navigation.push('NewsDetails', { selectedNews: each, category: 'Top Stories' })}>
        <View style={style.sliderWrapper} >
          <ImageBackground source={{uri: each.image}} style={{flex:1, resizeMode: 'cover'}} borderRadius = {5}>
          <View style={style.sliderContent}>
            <Text style={[style.fontWhite, style.bold]}>{each.headline}</Text>
            <View style={[style.right]}>
              <Text style={[style.fontWhite, style.primaryFont]}>{moment(each.timestamp).local().startOf('hour').fromNow()}</Text>
            </View>
          </View>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    );
  });
  return sliderList;
}

const Slider = ({data, navigation}) => {
  return(
    <View style={{height:220, marginTop: 10}}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {fetchList(data, navigation)}
      </ScrollView>
    </View>
  );
}
export default Slider;
