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
    backgroundColor: 'grey',
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

export default class Friends extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      searchString: '',
      view: 'Friends',
      friends: [],
      users: [],
      requests: [],
      friendS: styles.selected,
      userS: styles.button,
      requestS: styles.button,
      msg: ''
    };
  }

  componentWillMount(){
    this.getFriends();
    this.getNewRequests();
  }
  getFriends(search){
    var search = search || '';
    fetch(`${Config.API_URL}/api/friends/getFriends`,{
      method: 'POST',
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify({userId: this.props.user._id, search: search})
    })
    .then(response => {
      return response.json();
    })
    .then( friends => {
      friends.sort(function(a, b) {
        if(a.firstName < b.firstName) return -1;
        if(a.firstName > b.firstName) return 1;
        return 0;
      });
      this.setState({
        feed: friends,
        friends: friends,
        loading: false
      });
    })
    .catch( error => {
      console.log(error);
    });
  }
  getNewRequests(context){
     fetch(`${Config.API_URL}/api/friends/getRequests`,{
       method: 'POST',
       headers: { "Content-Type" : "application/json" },
       body: JSON.stringify({userId: this.props.user._id})
     })
     .then(response => {
       return response.json();
     })
     .then( requests => {
        this.setState({
          requests: requests,
          loading: false
        });
     })
     .catch( error => {
       console.log(error);
    });
  }
  getNewRequestsChangeFeed(context){
     fetch(`${Config.API_URL}/api/friends/getRequests`,{
       method: 'POST',
       headers: { "Content-Type" : "application/json" },
       body: JSON.stringify({userId: this.props.user._id})
     })
     .then(response => {
       return response.json();
     })
     .then( requests => {
        this.setState({
          requests: requests,
          feed: requests,
          loading: false
        });
     })
     .catch( error => {
      console.log(error);
    });
  }

  searchUsers(search){
    var search = search || '';
    fetch(`${Config.API_URL}/api/users/` + search,{
      method: 'GET',
      headers: { "Content-Type" : "application/json" }
      // body: JSON.stringify({userId: this.props.user._id, search: search})
    })
    .then(response => {
      return response.json();
    })
    .then( users => {
      users.sort(function(a, b) {
        if(a.firstName < b.firstName) return -1;
        if(a.firstName > b.firstName) return 1;
        return 0;
      });
      this.setState({
        feed: users,
        users: users,
        loading: false
      });
    })
    .catch( error => {
      console.log(error);
    });
  }
  searchFriends(search){
    var search = search || '';
    fetch(`${Config.API_URL}/api/friends/getFriends`,{
      method: 'POST',
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify({userId: this.props.user._id, search: search})
    })
    .then(response => {
      return response.json();
    })
    .then( friends => {
      friends.sort(function(a, b) {
        if(a.firstName < b.firstName) return -1;
        if(a.firstName > b.firstName) return 1;
        return 0;
      });
      this.setState({
        feed: friends,
        friends: friends,
        loading: false
      });
    })
    .catch( error => {
      console.log(error);
    });
  }
  searchNewRequests(context){
     fetch(`${Config.API_URL}/api/friends/getRequests`,{
       method: 'POST',
       headers: { "Content-Type" : "application/json" },
       body: JSON.stringify({userId: this.props.user._id})
     })
     .then(response => {
       return response.json();
     })
     .then( requests => {
        this.setState({
          requests: requests,
          feed: requests,
          loading: false
        });
     })
     .catch( error => {
      console.log(error);
    });
  }

  filterFriends(){
    this.setState({view: 'Friends'});
    this.setState({
      feed: this.state.friends,
      friendS: styles.selected,
      requestS: styles.button,
      userS:styles.button,
      msg: ''
    });
  }

  filterUsers(){
    this.setState({view: 'Users'});
    this.setState({
      feed: this.state.users || [],
      friendS: styles.button,
      requestS: styles.button,
      userS:styles.selected,
      msg: ''
    });
  }

  filterRequests(){
    this.setState({view: 'Requests'});
    this.setState({
      feed: this.state.requests,
      friendS: styles.button,
      requestS: styles.selected,
      userS:styles.button,
      msg: ''
    });
  }
  setMsg(){
    this.setState({msg: 'Friend Request Sent!'});
  }

  onSearchTextChange(event){
    this.setState({searchString: event.nativeEvent.text});
  }

  onSearchGo(){
    if(this.state.view === 'Friends'){
      this.searchFriends(this.state.searchString);
    }
    if(this.state.view === 'Requests'){
      this.searchNewRequests(this.state.searchString);
    }
    if(this.state.view === 'Users'){
      this.searchUsers(this.state.searchString);
    }

  }
  render(){
    if (this.state.loading) {
      return (
        <OurDrawer topBarFilterVisible={false} topBarName={'Friends'} _navigate={_navigate.bind(this)}>
          <View style={styles.spinner}>
            <Spinner/>
          </View>
        </OurDrawer>
        )
    }


    return (
      <OurDrawer user={this.props.user} topBarName={'Friends'} _navigate={_navigate.bind(this)}>
        <View style={styles.container}>
          <View style={styles.innerNav}>
            <TouchableOpacity onPress={this.filterFriends.bind(this)} style={this.state.friendS}>
              <Text style={styles.buttonText}>Search Friends</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.filterUsers.bind(this)} style={this.state.userS}>
              <Text style={styles.buttonText}>Search Users</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.filterRequests.bind(this)} style={this.state.requestS}>
              <Text style={styles.buttonText}>Friend Requests</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder='Search via name or email'
              onChange={this.onSearchTextChange.bind(this)}
              />
            <TouchableOpacity onPress={()=> this.onSearchGo()} style={styles.button}>
              <Text style={styles.buttonText}>Go</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
          {this.state.feed.map(
            (friend, index) => {
              return (
                <UserCard
                  key={index}
                  removeFriend={
                    ()=> {
                      this.filterFriends();
                      this.getFriends();
                    }
                  }
                  acceptRequest={
                    ()=> {
                      this.filterFriends();
                      this.getFriends();
                      this.getNewRequests();
                    }
                  }
                  rejectRequest = {
                    () => {
                      this.getNewRequestsChangeFeed();
                    }
                  }
                  currentUserId={this.props.user._id}
                  view={this.state.view}
                  setMsg={this.setMsg.bind(this)}
                  friends={this.state.friends}
                  user={friend}
                  index={index}/>
              )
            }
          )}
        </ScrollView>
      </OurDrawer>
    )
  }
};
