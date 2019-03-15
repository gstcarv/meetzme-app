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
import LocalizacaoEventoPendente from '@/screens/LocalizacaoEventoPendente'

export default createStackNavigator(
  {
    // Principal
    Home: HomeBottomTabNavigator,
    Procurar,
    Perfil,
    // Criar Novo Evento
    NovoEvento,
    SelecionarLocalizacao,
    SelecionarConvidados,
    // Aceitar Evento
    LocalizacaoEventoPendente
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
    transitionConfig: () => fromBottom()
  }
)