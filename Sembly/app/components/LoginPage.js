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
  }

  goLogin() {
    this.props.navigator.push({
        name: 'LoginForm'
    });
  }

  goRegis() {
    this.props.navigator.push({
        name: 'RegisForm'
    });
  }

  render(){
    return (
      <View>
        <View style={styles.container}>
          <TouchableOpacity onPress={this.goLogin.bind(this)} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.goRegis.bind(this)} style={styles.button}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};
