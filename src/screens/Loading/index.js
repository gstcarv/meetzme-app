import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  StatusBar,
  Image,
  ActivityIndicator,
  AsyncStorage
} from 'react-native'

import { withNavigation } from 'react-navigation'

import colors from "@/resources/colors"

import firebase from 'react-native-firebase'

class Principal extends Component {

  componentDidMount() {
    const { navigate } = this.props.navigation;
    this.unsubscribe = firebase.auth().onAuthStateChanged(async auth => {
      const userData = await AsyncStorage.getItem("USER_DATA");
      console.log("Storage", userData);
      console.log("AUTH", auth)
      if (auth) {
        const user = auth._user;
        if (!userData) {
          const { displayName, email, phoneNumber, photoURL, uid } = user;
          AsyncStorage.setItem("USER_DATA", JSON.stringify({
            displayName,
            email,
            phoneNumber,
            photoURL,
            uid
          }))
        }
        navigate('Logado');
      } else {
        console.log("non user");
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {

    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.primaryDark}
          animated />
        <View style={{ alignItems: 'center' }}>
          <Image source={require("@assets/images/app-logo.png")}
            style={{ width: 130, height: 130 }}></Image>
        </View>
        <View>
          <ActivityIndicator size="large" color="white" />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: colors.primaryDark
  }
})

export default withNavigation(Principal)