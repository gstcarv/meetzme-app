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

import firebase, { firestore } from 'react-native-firebase'

import store from '@/store'

class Principal extends Component {

  componentDidMount() {
    const { navigate } = this.props.navigation;

    this.unsubscribe = firebase.auth().onAuthStateChanged(async auth => {
      const userData = await AsyncStorage.getItem("USER_DATA");
      if (auth) {
        const user = auth._user;
        if (!userData) {
          const { displayName, email, phoneNumber, photoURL, uid } = user;
          let userInfo = {
            displayName,
            email,
            phoneNumber,
            photoURL,
            uid
          }
          AsyncStorage.setItem("USER_DATA", JSON.stringify(userInfo))
          store.loggedUserInfo = userInfo
        } else {
          store.loggedUserInfo = JSON.parse(userData)
        }

        let userContacts = await firebase.firestore()
          .collection('users')
          .doc(user.uid)
          .collection('contacts')
          .get();

        userContacts.forEach(async contact => {
          let uid = contact.data().uid;
          if (!store.loggedUserContacts.includes(uid)) {
            store.loggedUserContacts.push(uid)

            let contact = await firebase.firestore()
              .collection('users')
              .doc(uid)
              .get();

            const { name, phone, photoURL, username } = contact.data()
            let contactData = {
              id: contact.id,
              name,
              username: "@" + username,
              phone,
              photoURL
            }
            store.contactsData.push(contactData)
          }
        })

        navigate('Logged');

      } else {
        navigate('Principal');
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.primaryDark}
          animated />
        <View style={{ alignItems: 'center' }}>
          <Image source={require("@assets/images/logo_gray.png")}
            style={{ width: 130, height: 130 }}></Image>
        </View>
        <View>
          <ActivityIndicator size="large" color="white" style={styles.loader} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryDark
  },
  loader: {
    marginTop: 30
  }
})

export default withNavigation(Principal)