import React, { Component } from 'react'
import { DeviceEventEmitter } from 'react-native'
import NavigationStack from './navigation'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Provider as MobxProvider } from 'mobx-react'

// Theme
import PaperThemes from '@/resources/themes'

// Store
import ContactsStore from '@/store/ContactsStore'
import LoggedUserStore from '@/store/LoggedUserStore'
import EventsStore from '@/store/EventsStore'

export default class App extends Component {

  componentDidMount() {
    DeviceEventEmitter.addListener('onLocationChanged', coordinates => {
      LoggedUserStore.sendLocation(coordinates)
    })
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
      </PaperProvider>
    )
  }
}
