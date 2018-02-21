import React, { Component } from 'react';
import Login from './app/iOS/Login';
import {
  AppRegistry,
  NavigatorIOS,
} from 'react-native';

export default class life_log extends Component {

  render() {
    return (
      <NavigatorIOS
        navigationBarHidden={true}
        initialRoute={{title: "Log In", component: Login}}
        style = {{flex: 1}}
      />
    );
  }
}



AppRegistry.registerComponent('life_log', () => life_log);


