import React, { Component } from 'react'

import { 
  createStackNavigator,
} from 'react-navigation'

import { fromBottom } from 'react-navigation-transitions';

// Screens
import CadastrarEvento from './CadastrarEvento'
import SelecionarLocalizacao from './SelecionarLocalizacao'
import SelecionarConvidados from './SelecionarConvidados'

export default createStackNavigator(
  {
    CadastrarEvento,
    SelecionarLocalizacao,
    SelecionarConvidados
  },
  {
    initialRouteName: 'SelecionarConvidados',
    headerMode: 'none',
    transitionConfig: () => fromBottom()
  }
)