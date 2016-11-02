import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView
} from 'react-native';

import Drawer from 'react-native-drawer';

import Spinner from './Spinner.js'

import TopBar from './TopBar.js';
import OurDrawer from './OurDrawer.js';
import Menu from './Menu.js';
import UserCard from './UserCard.js';

import _navigate from './navigateConfig.js';
import Config from './Env.js';

var styles = StyleSheet.create({
  description: {
    marginBottom: 10,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  innerNav: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  buttonText: {
    fontSize: 14,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1,
    backgroundColor: '#F44336',
    flexDirection: 'row',
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  selected: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#3F51B5',
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    margin: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F44336',
  },
  searchInput: {
    height: 36,
    flex: 4,
    fontSize: 18,
    color: 'black'
  },
  image: {
    borderRadius: 100,
    height:200,
    width:200,
    marginRight:10,
    marginBottom: 20
  },
  spinner: {
    padding: 30,
    marginTop: 200,
    alignItems: 'center'
  }
});

export default class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }

  render(){
    return (
      <OurDrawer user={this.props.user} topBarName={'Profile'} _navigate={_navigate.bind(this)}>
        <View style={styles.container}>
          <Image style={styles.image} source={{uri: this.props.user.photoUrl}}/>
          <Text style={styles.description}>
            {this.props.user.firstName + ' ' + this.props.user.lastName}
          </Text>
          <Text style={styles.description}>
            {this.props.user.email}
          </Text>
        </View>
      </OurDrawer>
    )
  }
};
