import React, { Component } from 'react'
import { DeviceEventEmitter } from 'react-native'
import NavigationStack from './navigation'
import { Provider as PaperProvider } from 'react-native-paper'
import { Provider as MobxProvider } from 'mobx-react'
import RNAndroidLocationEnabler from 'react-native-android-location-enabler'

import Snackbar from 'react-native-snackbar'

// Theme
import PaperThemes from '@/resources/themes'

// Store
import ContactsStore from '@/store/ContactsStore'
import LoggedUserStore from '@/store/LoggedUserStore'
import EventsStore from '@/store/EventsStore'
import NotificationsStore from '@/store/NotificationsStore'

// Firebase
import firebase from 'react-native-firebase'

// Resources
import STRINGS from '@/resources/strings'
import COLORS from '@/resources/colors'

import EventBus from 'eventing-bus'

// Moment
import moment from 'moment'
import momentPTBR from 'moment/src/locale/pt-br';

// Reactotron [DEBUG]
import Reactotron from 'reactotron-react-native';

export default class App extends Component {

  prepareLocale(locale) {
    for (const key in locale) {
      if (locale.hasOwnProperty(key)) {
        locale[key.substring(1)] = locale[key];
      }
    }
    return locale;
  }

  connectReactotron() {
    console.tron = Reactotron
      .configure()
      .useReactNative()
      .connect()
  }

  createNotificationChannels() {
    // Criando o Canal de Notificação para Eventos
    const eventsChannel = new firebase.notifications.Android.Channel(
      STRINGS.CHANNELS.EVENTS,
      'Eventos',
      firebase.notifications.Android.Importance.Max
    ).setDescription('Receber atualizações dos Eventos');

    // Criando o Canal de Notificação para Usuários
    const usersChannel = new firebase.notifications.Android.Channel(
      STRINGS.CHANNELS.USERS,
      'Usuários e Contatos',
      firebase.notifications.Android.Importance.Max
    ).setDescription('Receber atualizações e Solicitações de Usuários');

    firebase.notifications().android.createChannel(eventsChannel);
    firebase.notifications().android.createChannel(usersChannel);
  }

  createNotificationReceiver() {
    // Evento ao Receber a Notificação
    this.unsubcribscribeNotificationReceiver =
      firebase.notifications()
        .onNotification((notification) => {
          const notificationChannel = notification.data.channel || STRINGS.CHANNELS.EVENTS;

          // Salva a notificação
          NotificationsStore.addNotification(notification.data);

          // Montando a Notificação
          const localNotification = new firebase.notifications.Notification({
            sound: 'default',
            show_in_foreground: true,
          })
            .setNotificationId(notification.notificationId)
            .setTitle(notification.title)
            .setSubtitle(notification.subtitle)
            .setBody(notification.body)
            .setData(notification.data)
            .android.setAutoCancel(true)
            .android.setChannelId(notificationChannel)
            .android.setSmallIcon('ic_notification')
            .android.setColor(COLORS.primaryColor)
            .android.setPriority(firebase.notifications.Android.Priority.Low);

          if (notificationChannel == STRINGS.CHANNELS.EVENTS) {
            const eventID = notification.data.event_id ? notification.data.event_id : "undefined"
            const action = new firebase.notifications.Android.Action(eventID, 'ic_launcher', 'Ver Evento');
            localNotification.android.addAction(action)
          } else if (notificationChannel == STRINGS.CHANNELS.USERS) {
            if (!notification.data.already_friend) {
              const userID = notification.data.user_id ? notification.data.user_id : "undefined"
              const actionAddUser = new firebase.notifications.Android.Action(userID, 'ic_launcher', 'Adicionar');
              const actionSeeUser = new firebase.notifications.Android.Action(userID, 'ic_launcher', 'Ver Usuário');
              localNotification.android.addAction(actionAddUser)
              localNotification.android.addAction(actionSeeUser)
            }
          }

          // Mostrando a Notificação
          firebase.notifications()
            .displayNotification(localNotification)
            .catch(err => console.error(err));
        });
  }

  async componentDidMount() {

    moment.defineLocale('pt-br', this.prepareLocale(momentPTBR));
    this.connectReactotron();

    // Pedir Permissão para ativar GPS
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({ interval: 10000, fastInterval: 5000 })
      .catch(() => {
        Snackbar.show({
          title: 'Para usar o MeetzMe sem problemas, pedimos que você ative o GPS',
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: '#b71b25'
        })
      });

    // Evento ao Receber Alterações na Localização
    DeviceEventEmitter.addListener('onLocationChanged', coordinates => {
      LoggedUserStore.sendLocation(coordinates)
    })

    DeviceEventEmitter.addListener('onCancelListenerPressed', () => {
      LoggedUserStore.stopLocationListener()
    })

    // Escuta as Alterações no TOKEN
    firebase.messaging().onTokenRefresh(async token => await LoggedUserStore.updateToken(token))

    this.createNotificationChannels()
    this.createNotificationReceiver();
  }

  render() {
    return (
      <React.Fragment>
        <PaperProvider theme={PaperThemes.primary}>
          <MobxProvider
            ContactsStore={ContactsStore}
            LoggedUserStore={LoggedUserStore}
            EventsStore={EventsStore}
            NotificationsStore={NotificationsStore}>
            <NavigationStack
              onNavigationStateChange={() => {
                EventBus.publish("bindTabLine");
              }}
            />
          </MobxProvider>
        </PaperProvider>
      </React.Fragment>
    )
  }

  componentWillUnmount() {
    this.unsubcribscribeLocalNotificationOpened = null;
    this.unsubcribscribePushNotificationOpened = null
    this.unsubcribscribeNotificationReceiver = null;
  }
}
