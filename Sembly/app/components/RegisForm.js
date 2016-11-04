import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
  TouchableOpacity,
  TextInput
} from 'react-native';
import Config from './Env.js';

import Spinner from './Spinner.js'


const styles = StyleSheet.create({
container: {
  padding: 30,
  marginTop: 100,
  alignItems: 'center'
},
errorText: {
  fontSize: 16,
  fontWeight: 'bold',
  color: 'red',
  paddingLeft: 10
},
buttonText: {
  fontSize: 20,
  fontWeight: 'bold',
  color: 'white',
  alignSelf: 'center'
},
button: {
  height: 36,
  flex: 1,
  backgroundColor: '#F44336',
  borderColor: '#F44336',
  borderWidth: 1,
  marginBottom: 10,
  alignSelf: 'stretch',
  justifyContent: 'center'
},
buttonText2: {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#F44336',
  alignSelf: 'center'
},
button2: {
  height: 36,
  flex: 1,
  marginBottom: 10,
  alignSelf: 'stretch',
  justifyContent: 'center'
},
searchInput: {
  height: 36,
  flex: 4,
  fontSize: 18,
  color: 'black'
},
inputContainer: {
  alignItems: 'center',
  alignSelf: 'stretch',
  margin: 10,
  borderBottomWidth: 1,
  borderBottomColor: '#F44336',
}
});


export default class RegisForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      first: null,
      last: null,
      email: null,
      password: null,
      confirm: null,
    }
  }

  _navigate() {
    this.props.navigator.push({
        name: 'Map'
    });
  }

  register() {
    fetch(`${Config.API_URL}/api/users/signup`,{
      method: 'POST',
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify({
        firstName: this.state.first,
        lastName: this.state.last,
        email: this.state.email,
        password: this.state.password,
        confirm: this.state.confirm,
        photoUrl: 'http://lionhallattorneys.com.ng/wp-content/uploads/2015/12/empty-profile.png'
      })
    })
    .then(response => {
      return response.json();
    })
    .then( user => {
      this.props.setUser(user);
      this.props.getLocation(this._navigate.bind(this));
    })
    .catch(err => {
      var context = this;
      this.setState({errorText: 'This email is currently in use'});
      setTimeout(() => {
        context.props.navigator.push({
            name: 'RegisForm'
        });
      }, 1000);
    })
  }

  change() {
    this.props.navigator.push({
        name: 'LoginForm'
    });
  }

  render(){
    if (this.state.loading) {
      return (<View style={styles.container}><Spinner/></View>)
    }
    else {
      return (
        <View>
          <View style={styles.container}>
            <View style={styles.inputContainer}>
            <Text style={styles.errorText}>{this.state.errorText}</Text>
            <Text style={styles.errorText}></Text>
              <TextInput
                style={styles.searchInput}
                placeholder='First name'
                onChangeText={(text) => this.setState({first:text})}
                autoCorrect={false}
                // onChange={this.onSearchTextChange.bind(this)}
                />
              <TextInput
                style={styles.searchInput}
                placeholder='Last name'
                onChangeText={(text) => this.setState({last:text})}
                autoCorrect={false}
                // onChange={this.onSearchTextChange.bind(this)}
                />
              <TextInput
                style={styles.searchInput}
                placeholder='Email'
                onChangeText={(text) => this.setState({email:text})}
                autoCapitalize='none'
                autoCorrect={false}
                // onChange={this.onSearchTextChange.bind(this)}
                />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder='Password'
                secureTextEntry={true}
                onChangeText={(text) => this.setState({password:text})}
                autoCapitalize='none'
                autoCorrect={false}
                // onChange={this.onSearchTextChange.bind(this)}
                />
              <TextInput
                style={styles.searchInput}
                placeholder='Confirm password'
                secureTextEntry={true}
                onChangeText={(text) => this.setState({confirm:text})}
                autoCapitalize='none'
                autoCorrect={false}
                // onChange={this.onSearchTextChange.bind(this)}
                />
            </View>
            <TouchableOpacity onPress={(e)=>{this.register()}} style={styles.button}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={(e)=>{this.change()}} style={styles.button2}>
              <Text style={styles.buttonText2}>Go to Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
};
