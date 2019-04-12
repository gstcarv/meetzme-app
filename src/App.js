import React, { Component } from 'react'
import { DeviceEventEmitter } from 'react-native'
import NavigationStack from './navigation'
import { DefaultTheme, Provider as PaperProvider, Snackbar } from 'react-native-paper';
import { Provider as MobxProvider } from 'mobx-react'

// Theme
import PaperThemes from '@/resources/themes'

// Store
import ContactsStore from '@/store/ContactsStore'
import LoggedUserStore from '@/store/LoggedUserStore'
import EventsStore from '@/store/EventsStore'
import NotificationsStore from '@/store/NotificationsStore'

// Firebase
import firebase from 'react-native-firebase'

// RESOURCES
import STRINGS from '@/resources/strings'
import COLORS from '@/resources/colors'

export default class App extends Component {

  state = {
    snackbar: {
      visible: false,
      text: ''
    }
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

  async componentDidMount() {

    // Evento ao Receber Alterações na Localização
    DeviceEventEmitter.addListener('onLocationChanged', coordinates => {
      LoggedUserStore.sendLocation(coordinates)
    })

    // Escuta as Alterações no TOKEN
    firebase.messaging().onTokenRefresh(async token => await LoggedUserStore.updateToken(token))

    this.createNotificationChannels()

    this.unsubcribscribeLocalNotificationOpened =
      firebase.notifications().onNotificationOpened(notification => {

      })

    // Evento ao Receber a Notificação
    this.unsubcribscribeNotificationReceiver =
      firebase.notifications().onNotification((notification) => {
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
          .android.setChannelId(notificationChannel) // e.g. the id you chose above
          .android.setSmallIcon('ic_launcher') // create this icon in Android Studio
          .android.setColor(COLORS.primaryColor) // you can set a color here
          .android.setPriority(firebase.notifications.Android.Priority.High);

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

    // Evento ao Receber a Notificação [App Fechado]
    this.unsubcribscribePushNotificationOpened =
      firebase.notifications().getInitialNotification()
        .then(notification => {

        })

  }

  render() {
    return (
      <PaperProvider theme={PaperThemes.primary}>
        <MobxProvider
          ContactsStore={ContactsStore}
          LoggedUserStore={LoggedUserStore}
          EventsStore={EventsStore}
          NotificationsStore={NotificationsStore}>
          <NavigationStack />
        </MobxProvider>
      </PaperProvider>
    )
  }

  componentWillUnmount() {
    this.unsubcribscribeLocalNotificationOpened = null;
    this.unsubcribscribePushNotificationOpened = null
    this.unsubcribscribeNotificationReceiver = null;
  }
}
