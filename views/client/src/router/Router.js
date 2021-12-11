import React from 'react';
import{ Text } from 'react-native';
import { View } from 'native-base';
import { createStackNavigator, createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import TopStories from '../components/news-categories/TopStories';
import World from '../components/news-categories/World';
import India from '../components/news-categories/India';
import Sports from '../components/news-categories/Sports';
import Technology from '../components/news-categories/Technology';
import NewsDetails from '../components/NewsDetails';
import LoadingScreen from '../components/LoadingScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import style from '../styles/style';
const Router = createStackNavigator({
  Home: {
    screen: createMaterialTopTabNavigator({
      TopStories: {
        screen           : TopStories,
        navigationOptions: {
          title: 'TOP STORIES'
        }
      },
      World     : { screen: World },
      India     : { screen: India },
      Sports    : { screen: Sports },
      Technology: { screen: Technology }
    },
      {
        tabBarOptions: {
          initialRouteName: 'TopStories',
          scrollEnabled   : true,
          style           : {
            backgroundColor  : '#ffffff',
            borderBottomColor: '#000000'
          },
          labelStyle: {
            color     : '#000000',
            fontFamily: 'googleSansBold'
          },
          indicatorStyle: {
            backgroundColor: '#000000',
            borderRadius   : 20,
            borderWidth    : 1.2
          },
        },
      }
    )
  },
  NewsDetails: {
    screen           : NewsDetails,
    navigationOptions: {
      header: null
    }
  },
  LoadingScreen: {
    screen           : LoadingScreen,
    navigationOptions: {
      header: null
    }
  }
},
  {
    initialRouteName        : 'Home',
    defaultNavigationOptions: {
      //title           : 'News Crunch',
      headerLeft: <View style={[style.flexRow,{marginLeft: 20}]}><Icon name="newspaper-o" size={25}/><Text style={[style.headerTitle, {marginLeft: 5}]}>News Crunch</Text></View>,
      headerStyle: {
        elevation    : 0,   // remove shadow on Android
        shadowOpacity: 0,   // remove shadow on iOS
      },
    },
  }
);

export default createAppContainer(Router);
