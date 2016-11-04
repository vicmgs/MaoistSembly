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


import Spinner from './Spinner.js'
import Config from './Env.js';


const styles = StyleSheet.create({
container: {
  padding: 30,
  marginTop: 100,
  alignItems: 'center'
},
buttonText: {
  fontSize: 20,
  fontWeight: 'bold',
  color: 'white',
  alignSelf: 'center'
},
errorText: {
  fontSize: 16,
  fontWeight: 'bold',
  color: 'red',
  paddingLeft: 10
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


export default class LoginForm extends Component {
  constructor(props){
    super(props);
    this.state = {loading: false, email: null, password: null, errorText: ''}
  }

  _navigate() {
    this.props.navigator.push({
        name: 'Map'
    });
  }

  login() {
    this.setState({loading: true});
    fetch(`${Config.API_URL}/api/users/login`,{
      method: 'POST',
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify({email: this.state.email, password: this.state.password})
    })
    .then(response => {
      return response.json();
    })
    .then( user => {
      this.props.setUser(user);
      this.props.getLocation(this._navigate.bind(this));
    })
    .catch(err => {
      this.setState({loading: false});
      var context = this;
      this.setState({errorText: 'Incorrect username/password'});
      setTimeout(() => {
        context.props.navigator.push({
            name: 'LoginForm'
        });
      }, 1000);
    })
  }

  change() {
    this.props.navigator.push({
        name: 'RegisForm'
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
              <Text></Text>
              <TextInput
                style={styles.searchInput}
                placeholder='Enter email'
                onChangeText={(text) => this.setState({email:text})}
                autoCapitalize='none'
                autoCorrect={false}
                ref={'textInput1'}
                // onChange={this.onSearchTextChange.bind(this)}
                />
              <TextInput
                style={styles.searchInput}
                placeholder='Enter password'
                secureTextEntry={true}
                onChangeText={(pwtext) => this.setState({password:pwtext})}
                autoCapitalize='none'
                autoCorrect={false}
                ref={'textInput2'}
                // onChange={this.onSearchTextChange.bind(this)}
                />
            </View>
            <TouchableOpacity onPress={(e)=>{this.login()}} style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={(e)=>{this.change()}} style={styles.button2}>
              <Text style={styles.buttonText2}>Go to Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
};
