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

// Firebase
import firebase from 'react-native-firebase'

export default class App extends Component {

  state = {
    snackbar: {
      visible: false,
      text: ''
    }
  }

  async componentDidMount() {
    // Evento ao Receber Alterações na Localização
    DeviceEventEmitter.addListener('onLocationChanged', coordinates => {
      LoggedUserStore.sendLocation(coordinates)
    })

    // Evento ao Receber a Notificação
    this.notificationListener = firebase.notifications().onNotification((notification) => {


    });

    // Evento ao Receber a Notificação [App Fechado]
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      console.log(notificationOpen)
    }

  }

  render() {
    return (
      <PaperProvider theme={PaperThemes.primary}>
        <MobxProvider
          ContactsStore={ContactsStore}
          LoggedUserStore={LoggedUserStore}
          EventsStore={EventsStore}>
          <NavigationStack />
        </MobxProvider>
        <Snackbar
          visible={this.state.snackbarVisible}
          duration={5000}
          onDismiss={() => this.setState({ visible: false })}
          action={{
            label: 'Undo',
            onPress: () => {
              // Do something
            },
          }}
        >
          Hey there! I'm a Snackbar.
        </Snackbar>
      </PaperProvider>
    )
  }

  componentWillUnmount() {
    this.notificationOpenedListener();
    this.notificationListener();
  }
}
