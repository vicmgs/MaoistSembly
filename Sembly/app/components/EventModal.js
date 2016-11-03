// EventModal.js
import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TextInput
} from 'react-native';

import Spinner from './Spinner.js';
import UserCard from './UserCard.js';
import Modal from 'react-native-modalbox';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Config from './Env.js';

const styles = StyleSheet.create({
  modal: {
    marginTop: 40,
    flex: 1
  },
  scroll: {
    flex: 1
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  title: {
    fontSize: 30,
    marginBottom: 10,
    color: 'black',
    alignSelf: 'center'
  },
  absolute: {
    position: 'absolute',
    top: 40,
    left: 15
  },
  absoluteX: {
    position: 'absolute',
    top: 10,
    right: 15,
  },
  closeButton:{
    fontSize: 30,
    zIndex: 3,
    backgroundColor: 'transparent'
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
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
    flexDirection: 'row',
    backgroundColor: '#F44336',
    borderColor: '#F44336',
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  actionButton: {
    margin: 10,
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F44336',
    borderColor: '#F44336',
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  selected: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#3F51B5',
    borderColor: '#F44336',
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderColor: 'grey',
    color: 'black',
  },
  image: {
    height:200,
    width: Dimensions.get('window').width,
    marginBottom: 20,
    zIndex: 1
  },
  chats: {
    margin: 15,
    borderColor: 'grey'
  }
});

export default class EventModal extends Component {
  constructor (props) {
    super(props);
    this.state = {
      visible: false,
      loading: true,
      button: styles.button,
      messages: []
    };
    this.onSend = this.onSend.bind(this);
  }
  componentWillMount() {
    this.setState({loading:true})
      this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
      ],
    });
  }

  onSend(messages = []) {
  this.setState((previousState) => {
    return {
      messages: GiftedChat.append(previousState.messages, messages),
    };
  });
}

  transformDate(dateStr){
    var months = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];
    var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    var dateUsed = new Date(dateStr);

    var amOrPm = '';
    var day = days[dateUsed.getDay() - 1] + ' ';
    var dateArr = dateUsed.toString().split(' ');
    var part1 = dateArr.slice(1,2).join('. ') + '. ';
    var part2 = dateArr.slice(2, 3).toString() + ' at ';
    var time = dateArr.slice(4, 5).toString();
    var hour = +(time.split(':')[0]);
    if(hour >= 12){
      amOrPm = ' pm';
    } else {
      amOrPm = ' am';
    }
    hour = hour > 12 ? hour - 12 : hour;
    var part4 = (dateArr.slice(4,5)).toString().split(':');
    part4.shift();
    part4.pop();


    return day + part1 + part2 + hour + ':' + part4 + amOrPm;
  }
  getEvent() {
    fetch(`${Config.API_URL}/api/events/` + this.props.event)
    .then(response => {
      return response.json();
    })
    .then( event => {
      this.setState({event: event, loading: false});
    })
    .catch( error => {
      console.log(error);
    });
  }

  getRender () {
    if (this.state.loading === true) {
      this.getEvent();
      return (<Spinner/>)
    } else {
      return (
        <View>
          <Image style={styles.image} source={{uri: this.state.event.image}}/>
          <View>
            <Text style={styles.title} >{this.state.event.name}</Text>
          </View>
          <View>
            <Text style={styles.description}>{this.state.event.tags.join(' ')}</Text>
            <Text style={styles.description}>{this.transformDate(this.state.event.startTime)}</Text>
          </View>
          <ScrollView style={styles.chats}>
         <GiftedChat
          messages={this.state.messages}
          onSend={this.onSend}
          user={{
          _id: 1,
                }}
          />
          </ScrollView>
        </View>
        )
    }
  }
  render () {
    let context = this;
    return (
      <Modal ref={'EventModal'} onClosed={(e) => this.props.close()} style={styles.modal} isOpen={true}>
        <View style={styles.container}>
          {this.getRender()}
          <View style={styles.absoluteX}>
            <TouchableOpacity onPress={() => {this.props.close(); context.refs.EventModal.close()}}>
              <Icon style={styles.closeButton} name='close'/>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }
}
