import React from 'react'

import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator
} from 'react-navigation'


import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';

import {
  fromRight
} from 'react-navigation-transitions'

import Guest from './Guest'
import Logged from './Logged'
import Loading from '@/screens/Loading'

import PermissaoLocalizacao from '@/screens/PermissaoLocalizacao'

const LoadingScreen = createStackNavigator({
  Loading,
  PermissaoLocalizacao
}, { 
  headerMode: 'none', 
  transitionConfig: () => fromRight() 
})

const Routes = createAnimatedSwitchNavigator(
  {
    Guest,
    Logged: Logged,
    Loading: LoadingScreen,
  },
  {
    initialRouteName: 'Loading',
    headerMode: 'none',transition: (
      <Transition.Together>
        <Transition.Out
          type="slide-bottom"
          durationMs={400}
          interpolation="easeInOut"
        />
        <Transition.In type="fade" durationMs={500} />
      </Transition.Together>
    ),
  }
)

export default createAppContainer(Routes)