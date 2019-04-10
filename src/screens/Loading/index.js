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

@inject('ContactsStore')
@inject('EventsStore')
@inject('LoggedUserStore')
@inject('NotificationsStore')
@observer
class Principal extends Component {

  async getUserLocation() {
    navigator.geolocation.getCurrentPosition(
      async pos => {
        const UID = this.props.LoggedUserStore.get().uid;
        const { latitude, longitude } = pos.coords;
        await this.props.LoggedUserStore.sendLocation({
          latitude, longitude
        })
      },
      err => { },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
    )
  }

  componentDidMount() {
    const { navigate } = this.props.navigation;
    const {
      ContactsStore,
      EventsStore,
      LoggedUserStore,
      NotificationsStore
    } = this.props;

    let isWatchingEvents = false;

    this.unsubscribe = firebase.auth().onAuthStateChanged(async auth => {
      // Pega os dados do usuário do AsyncStorage
      const userData = await AsyncStorage.getItem("USER_DATA");
      if (auth) {
        const AuthUser = auth._user;

        if (!userData) {
          // Pega as Informações do Usuários
          const { displayName, email, phoneNumber, photoURL, uid } = AuthUser;

          // Referência do Usuário no Firestore
          const userCollection = firebase.firestore()
            .collection('users')
            .doc(uid)

          // Põe o Token do FCM no Usuário 
          const FCMToken = await firebase.messaging().getToken()
          userCollection.update({ FCMToken })

          // Pega as informações adicionais do Usuário do Firestore
          let getUserFromFirestore = await userCollection.get()
          let { name, phone, username } = getUserFromFirestore.data()

          // Salva o Usuário no Store
          LoggedUserStore.setUser({
            displayName,
            username,
            name,
            email,
            phoneNumber,
            phone,
            photoURL,
            uid,
            FCMToken
          })
        } else {
          LoggedUserStore.setUser(JSON.parse(userData))
        }

        // Começa a ouvir as atualizações dos Contatos e Eventos
        await ContactsStore.fetchContacts();
        await EventsStore.fetchEvents();
        // Pega a Localização Atual
        this.getUserLocation();

        // Pega as Notificações do Async Storage
        NotificationsStore.fetchNotifications();

        if (!isWatchingEvents) {
          EventsStore.watchEvents();
          isWatchingEvents = true
        }

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