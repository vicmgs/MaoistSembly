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


const styles = StyleSheet.create({
container: {
  padding: 30,
  marginTop: 200,
  alignItems: 'center'
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


export default class LoginForm extends Component {
  constructor(props){
    super(props);
    this.state = {loading: false, email: null, password: null}
  }

  _navigate() {
    this.props.navigator.push({
        name: 'Map'
    });
  }

  componentWillMount () {
    this.props.getLocation();
  }

  login() {
    this.setState({loading: true});
    fetch('http://localhost:3000/api/users/login',{
      method: 'POST',
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify({email: this.state.email, password: this.state.password})
    })
    .then(response => {
      return response.json();
    })
    .then( user => {
      this.props.setUser(user);
      this._navigate();
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
              <TextInput
                style={styles.searchInput}
                placeholder='Enter email'
                onChangeText={(text) => this.setState({email:text})}
                autoCapitalize='none'
                // onChange={this.onSearchTextChange.bind(this)}
                />
              <TextInput
                style={styles.searchInput}
                placeholder='Enter password'
                secureTextEntry={true}
                onChangeText={(pwtext) => this.setState({password:pwtext})}
                autoCapitalize='none'
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
