import React, { Component } from 'react'
import NavigationStack from './navigation'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Provider as MobxProvider } from 'mobx-react'

// Theme
import PaperThemes from '@/resources/themes'

// Store
import ContactsStore from '@/store/ContactsStore'

export default class App extends Component {
  render() {
    return (
      <PaperProvider theme={PaperThemes.primary}>
        <MobxProvider ContactsStore={ContactsStore}>
         <NavigationStack />
        </MobxProvider>
      </PaperProvider>
    )
  }
}
