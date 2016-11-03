import React, { Component } from 'react';
/*
https://facebook.github.io/react-native/docs/statusbar.html
https://facebook.github.io/react-native/docs/stylesheet.html
https://facebook.github.io/react-native/docs/text.html
https://facebook.github.io/react-native/docs/view.html
https://facebook.github.io/react-native/docs/using-navigators.html
*/

import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

var app;
import TopBar from './TopBar.js';
import LoginPage from './LoginPage.js';
import LoginForm from './LoginForm.js';
import RegisForm from './RegisForm.js';
import Main from './Main.js';
import Map from './Map.js';
import Profile from './Profile.js';
import Feed from './Feed.js';
import Friends from './Friends.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    app = this
  }

  getLocation(callback) {
    let context = this;
    navigator.geolocation.getCurrentPosition(
      (data) => {
        context.setState({
          currentLoc: [data.coords.latitude, data.coords.longitude],
          mongoLocation: [data.coords.longitude, data.coords.latitude]
        });
        callback();
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  setUser(user) {
    this.setState({user: user})
  }

  renderScene(route, navigator){
    if(route.name === 'LoginPage'){
      return <LoginPage navigator={navigator}/>
    }
    if(route.name === 'LoginForm'){
      return <LoginForm getLocation={app.getLocation.bind(app)} setUser={app.setUser.bind(app)} warn={route.err} navigator={navigator}/>
    }
    if(route.name === 'RegisForm'){
      return <RegisForm getLocation={app.getLocation.bind(app)} setUser={app.setUser.bind(app)} navigator={navigator}/>
    }
    if(route.name === 'Profile') {
      return <Profile user={app.state.user} navigator={navigator}/>
    }
    if(route.name === 'Map') {
      return <Map user={app.state.user} mongoLocation={app.state.mongoLocation} navigator={navigator}/>
    }
    if(route.name === 'Feed') {
      return <Feed name={route.name} user={app.state.user} mongoLocation={app.state.mongoLocation} page={'bundle'} navigator={navigator}/>
    }
    if(route.name === 'Friends') {
      return <Friends user={app.state.user} navigator={navigator}/>
    }
  }

  configureScene(route, routeStack){
   return Navigator.SceneConfigs.FadeAndroid;
  }

  render () {
    return (
      <Navigator
        configureScene={ this.configureScene }
        style={styles.container}
        initialRoute={{name: 'LoginPage'}}
        renderScene={this.renderScene}/>
    )
  }
}

const styles = StyleSheet.create({
  container: {

  }
});
