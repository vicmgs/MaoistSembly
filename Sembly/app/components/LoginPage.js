import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Navigator,
  TouchableHighlight,
  TouchableOpacity
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
label:{

},
fieldText:{
  height: 40, 
  borderColor: 'gray', 
  borderWidth: 1,
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
}
});


export default class LoginPage extends Component {
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

  signUp() {
    this.setState({loading: true});
    fetch('http://localhost:3000/api/users/signup',{
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

  render(){
    if (this.state.loading) {
      return (<View style={styles.container}><Spinner/></View>)
    }
    else {
      return (
        <View>
          <View style={styles.container}>
              <Text style={styles.fieldText}>User:</Text>
              <TextInput
                style={styles.fieldText}
                autoCapitalize='none'
                onChangeText={(text) => this.setState({email:text})} 
                value={this.state.email} 
              />
              
              <Text style={styles.fieldText}>Password:</Text>

              <TextInput

                style={styles.fieldText}
                autoCapitalize='none'
                secureTextEntry={true}
                onChangeText={(pwtext) => this.setState({password:pwtext})} 
                value={this.state.password} 
              />
            <TouchableOpacity onPress={(e)=>{this.login()}} style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
};
