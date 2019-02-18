import React, { Component } from 'react'

import { 
  createStackNavigator,
} from 'react-navigation'

import { fromBottom } from 'react-navigation-transitions';

// Bottom Navigator
import HomeBottomTabNavigator from './HomeBottomTabNavigator'

// Screens
import NovoEvento from '@/screens/NovoEvento'
import SelecionarLocalizacao from '@/screens/NovoEvento/SelecionarLocalizacao'
import SelecionarConvidados from '@/screens/NovoEvento/SelecionarConvidados'
import Procurar from '@/screens/Procurar'

export default createStackNavigator(
  {
    Home: HomeBottomTabNavigator,
    Procurar,
    NovoEvento,
    SelecionarLocalizacao,
    SelecionarConvidados
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
    transitionConfig: () => fromBottom()
  }
)