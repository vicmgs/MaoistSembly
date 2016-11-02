import React, { Component } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Navigator,
  Dimensions
} from 'react-native';

import Spinner from './Spinner.js'

import MapView from 'react-native-maps';
import NewEventModal from './NewEventModal.js';
import OurDrawer from './OurDrawer.js';
import _navigate from './navigateConfig.js';
import NewEventFab from './NewEventFab.js';
import Config from './Env.js';

export default class Map extends Component {
  constructor (props) {
    super(props);
    this.state = {
      loading: true,
      markers: null,
      friends: null,
      modalVisible: false,
    };
  }

  setNewEventPinCoords () {
    fetch(`${Config.API_URL}/api/users/update/loc`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.props.user.email,
        location: [Number(this.props.mongoLocation[0]), Number(this.props.mongoLocation[1])]
      })
    })
    .then(data => {
      this.setState({x: {
        latitude: this.props.mongoLocation[1],
        longitude: this.props.mongoLocation[0]
      } });
    })
    .catch((err) => {
      console.log(err);
    })
  }

  fetchEvents () {
    fetch(`${Config.API_URL}/api/events/bundle`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: this.props.user._id,
        location: this.props.mongoLocation
      })
    })
    .then(data => {
      return data.json()
    })
    .then(data => {
      this.setState({markers: data, loading: false})
    })
    .catch((err) => {
      console.log(err);
    })
  }

  getFriends(){
    fetch(`${Config.API_URL}/api/friends/getFriends`,{
      method: 'POST',
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify({userId: this.props.user._id, search: ''})
    })
    .then(response => {
      return response.json();
    })
    .then( friends => {
      this.setState({
        friends: friends
      });
    })
    .catch( error => {
      console.log(error);
    });
  }
  componentWillMount () {
    this.setNewEventPinCoords();
    this.getFriends();
    this.fetchEvents();
  }
  openModal () {
    this.setState({modalVisible: true})
  }
  render () {
    if(this.state.loading){
      return (
        <OurDrawer user={this.props.user} topBarFilterVisible={true} topBarName={'Map'} _navigate={ _navigate.bind(this)}>
          <View style={styles.spinner}>
            <Spinner />
          </View>
        </OurDrawer>
      )
    }
    else {
      return (
        <OurDrawer user={this.props.user} topBarFilterVisible={false} topBarName={'Map'} _navigate={ _navigate.bind(this)}>
          <View>
            <MapView
              showsUserLocation={true}
              style={styles.map}
              initialRegion={{
                latitude: this.props.mongoLocation[1],
                longitude: this.props.mongoLocation[0],
                latitudeDelta: .04,
                longitudeDelta: .02
            }}>
            <MapView.Marker draggable
              coordinate={this.state.x}
              pinColor='yellow'
              title='The location of your next event!'
              onDragEnd={(e) => this.setState({ x: e.nativeEvent.coordinate })}
            />
            {this.state.markers.map(marker => {
              var tempLoc = {
                latitude: marker.location[1],
                longitude: marker.location[0]
              }
              return (
                <MapView.Marker
                  key={marker._id}
                  coordinate={tempLoc}
                  title={marker.name}
                  pinColor='red'
                />
              )
            })}
            {this.state.friends.map(friend => {
              var tempLoc = {
                latitude: friend.location[1] + Math.random()*0.01,
                longitude: friend.location[0] + Math.random()*0.01
              }
              return (
                <MapView.Marker
                  key={friend._id}
                  coordinate={tempLoc}
                  title={friend.firstName + ' ' + friend.lastName}
                  pinColor='green'
                />
              )
            })}
            </MapView>
            <NewEventFab onPress={this.openModal.bind(this)}/>
            <NewEventModal resetPin={this.setNewEventPinCoords.bind(this)} fetchNewEvents={this.fetchEvents.bind(this)} userId={this.props.user._id} eventCoords={this.state.x} modalVisibility={this.state.modalVisible}/>
          </View>
        </OurDrawer>
      )
    }
  }
}

const styles = StyleSheet.create({
  map: {
    height: Dimensions.get('window').height - 60,
  },
  spinner: {
    padding: 30,
    marginTop: 200,
    alignItems: 'center'
  }
});
