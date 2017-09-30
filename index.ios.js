import Login from './app/iOS/Login';
import TouchId from './app/iOS/TouchId'


import React, { Component } from 'react';
import {
  AppRegistry,
  NavigatorIOS,
} from 'react-native'; //Registers the app and NavigatorIOS is used to navigate the app. Inital route on line 17 establishes where the app begins.

export default class life_log extends Component {

  render() {
    return (
      <NavigatorIOS
        navigationBarHidden={true}
        initialRoute={{title: "Log In", component: Login}} //required for NaviOS
        style = {{flex: 1}}
      />
    );
  }
}



AppRegistry.registerComponent('life_log', () => life_log);
