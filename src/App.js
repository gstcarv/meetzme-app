import React, { Component } from 'react'
import NavigationStack from './navigation'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import PaperThemes from '@/resources/themes'

export default class App extends Component {
  render() {
    return (
      <PaperProvider theme={PaperThemes.primary}>
        <NavigationStack />
      </PaperProvider>
    )
  }
}
