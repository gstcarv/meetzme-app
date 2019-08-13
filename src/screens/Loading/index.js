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

    this.unsubscribe = firebase.auth().onAuthStateChanged(async auth => {
      // Pega os dados do usuário do AsyncStorage
      const userData = await AsyncStorage.getItem("USER_DATA");
      if (auth) {
        const AuthUser = auth._user;

        if (!userData || JSON.parse(userData).uid != AuthUser.uid) {
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
          LoggedUserStore.setUser(JSON.parse(userData))
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

    const animationDuration = 1000,
      animatedBounciness = 20;

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
      scale: new Animated.Value(1.342),
      translate: new Animated.Value(16)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.primaryDark}
          animated />
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
          <LoadingSpinner
            style={styles.loaderStyle}
            isVisible={true}
            size={45}
            type={"WanderingCubes"}
            color={"#ffffff"} />
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
    marginTop: 30
  },
  imageStyle: {
    width: 150, height: 150
  },
})

export default withNavigation(Principal)