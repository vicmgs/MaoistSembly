export default function _navigate(name){
    if(name === 'Profile'){
      this.props.navigator.resetTo({
        name: 'Profile'
      });
    }
    if(name === 'Map'){
      this.props.navigator.resetTo({
        name: 'Map'
      });
    }
    if(name === 'Feed'){
      this.props.navigator.resetTo({
        name: 'Feed'
      });
    }
    if(name === 'LoginForm'){
      this.props.navigator.resetTo({
        name: 'LoginForm'
      });
    }
};
