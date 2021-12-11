import React, { Component } from 'react';
import Router from './src/router/Router';
import firebaseConfig from './src/assets/FirebaseConfiguration';
import * as DbService from './src/services/DbService';
import * as Font from 'expo-font';
import LoadingScreen from './src/components/LoadingScreen';

class App extends Component {
  constructor(props) {
    super(props);
    DbService.init(firebaseConfig);
    this.state = {
      fontsLoaded: false
    }
  }
  async componentDidMount() {
    await Font.loadAsync({
      googleSansRegular: require('./src/assets/fonts/GoogleSans/GoogleSans-Regular.ttf'),
      googleSansItalic: require('./src/assets/fonts/GoogleSans/GoogleSans-Italic.ttf'),
      googleSansBold: require('./src/assets/fonts/GoogleSans/GoogleSans-Bold.ttf')
    });
    this.setState({fontsLoaded: true});
  }
  render() {
    if(this.state.fontsLoaded) {
      return(<Router/>);
    }
    else {
      return (<LoadingScreen/>);
    }
  }
}

export default App;
