import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import { withNavigation } from 'react-navigation'

import firebase from 'react-native-firebase'

class AuthStateProvider extends Component {
  componentWillMount() {
    const { navigate } = this.props.navigation;
    this.unsubscribe = firebase.auth().onAuthStateChanged(async auth => {
      const userData = await AsyncStorage.getItem("USER_DATA");
      if(auth){
        const user  = auth._user;
        if(!userData){
          const { displayName, email, phoneNumber, photoURL, uid } = user;
          AsyncStorage.setItem("USER_DATA", JSON.stringify({
            displayName,
            email,
            phoneNumber,
            photoURL,
            uid
          }))
        }
      } else {
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return null
  }
}

export default withNavigation(AuthStateProvider)
