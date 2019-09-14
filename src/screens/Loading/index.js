import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  StatusBar,
  Image,
  ActivityIndicator,
  AsyncStorage,
  Animated
} from 'react-native'

import Permissions from 'react-native-permissions'
import { withNavigation } from 'react-navigation'

import colors from "@/resources/colors"

import firebase from 'react-native-firebase'

import { inject, observer } from 'mobx-react/native'
import { toJS } from 'mobx'

import LoadingSpinner from 'react-native-spinkit'

@inject('ContactsStore')
@inject('EventsStore')
@inject('LoggedUserStore')
@inject('NotificationsStore')
@observer
class Principal extends Component {

  componentDidMount() {
    const { navigate } = this.props.navigation;
    const {
      ContactsStore,
      EventsStore,
      LoggedUserStore,
      NotificationsStore
    } = this.props;

    let isWatchingEvents = false;

    authStateChanged = false;
    this.unsubscribe = firebase.auth().onAuthStateChanged(async auth => {

      // Verifica se a autenticação já foi feita (evitar pegar dados 2 vezes)
      if (authStateChanged) {
        return;
      } else {
        authStateChanged = true;
      }


      // Pega os dados do usuário do AsyncStorage
      let storagedUserData = JSON.parse(await AsyncStorage.getItem("USER_DATA"));
      if (auth) {

        const AuthUser = auth._user;
        
        if (storagedUserData != null && storagedUserData.uid != AuthUser.uid) {
          await AsyncStorage.clear()
        }

        if (!storagedUserData || storagedUserData.uid != AuthUser.uid) {

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

          // Salva os dados no Store
          const StorageData = JSON.stringify(toJS(LoggedUserStore.get()));
          await AsyncStorage.setItem("USER_DATA", StorageData)
        } else {
          LoggedUserStore.setUser(storagedUserData)
        }

        // Começa a ouvir as atualizações dos Contatos e Eventos
        await ContactsStore.fetchContacts();
        await EventsStore.fetchEvents();

        let locationPermission = await Permissions.check('location');

        // Pega as Notificações do Async Storage
        NotificationsStore.fetchNotifications();

        if (!isWatchingEvents) {
          EventsStore.watchEvents();
          isWatchingEvents = true
        }

        if (locationPermission != "authorized") {
          navigate('PermissaoLocalizacao');
        } else {
          LoggedUserStore.getAndSendLocation()
          navigate('Logged');
        }
      } else {
        navigate('Principal');
      }
    })

    const animationDuration = 2000,
      animatedBounciness = 30;

    Animated.spring(
      this.imageTransform.scale,
      {
        toValue: 1,
        duration: animationDuration,
        useNativeDriver: true,
        bounciness: animatedBounciness
      }
    ).start();

    Animated.spring(
      this.imageTransform.translate,
      {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: true,
        bounciness: animatedBounciness
      }
    ).start();

  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  constructor() {
    super()
    this.imageTransform = {
      scale: new Animated.Value(1),
      translate: new Animated.Value(24)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.primaryDark}
          animated
          translucent />
        <View style={{ alignItems: 'center' }}>
          <Animated.Image
            source={require("@assets/images/logo_gray.png")}
            style={[
              styles.imageStyle,
              {
                transform: [
                  { scaleX: this.imageTransform.scale },
                  { scaleY: this.imageTransform.scale },
                  { translateY: this.imageTransform.translate }
                ]
              }
            ]}
          />
        </View>
        <View>
          <ActivityIndicator
            size="large"
            color={"#eee"}
            style={styles.loaderStyle}
          />
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
  loaderStyle: {
    marginTop: 50,
    marginLeft: 4
  },
  imageStyle: {
    width: 200, height: 200
  },
})

export default withNavigation(Principal)