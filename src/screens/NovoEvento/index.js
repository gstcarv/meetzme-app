import React, { Component } from 'react'

import { 
  createStackNavigator,
} from 'react-navigation'

import { fromBottom } from 'react-navigation-transitions';

// Screens
import CadastrarEvento from './CadastrarEvento'
import SelecionarLocalizacao from './SelecionarLocalizacao'

export default createStackNavigator(
  {
    CadastrarEvento,
    SelecionarLocalizacao
  },
  {
    initialRouteName: 'CadastrarEvento',
    headerMode: 'none',
    transitionConfig: () => fromBottom()
  }
)