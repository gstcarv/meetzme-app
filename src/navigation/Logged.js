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
import Perfil from '@/screens/Perfil'

export default createStackNavigator(
  {
    Home: HomeBottomTabNavigator,
    Procurar,
    Perfil,
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