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

import { inject, observer } from 'mobx-react/native'

import LoggedUserStore from '@/store/LoggedUserStore'

@inject('ContactsStore')
@inject('EventsStore')
@observer
class Principal extends Component {

  componentDidMount() {
    const { navigate } = this.props.navigation;
    const { ContactsStore, EventsStore } = this.props;

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
          LoggedUserStore.setUser(userInfo)
        } else {
          LoggedUserStore.setUser(JSON.parse(userData))
        }

        await ContactsStore.fetchContacts();
        await EventsStore.fetchEvents();

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