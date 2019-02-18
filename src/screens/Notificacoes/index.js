import React, { Component } from 'react'

import colors from '@/resources/colors'
import fonts from '@/resources/fonts'

import { 
  createMaterialTopTabNavigator
} from 'react-navigation'

import FAIcon from 'react-native-vector-icons/FontAwesome5'

// Screens
import NotificacoesEventos from './NotificacoesEventos'
import NotificacoesSolicitacoes from './NotificacoesSolicitacoes'

export default createMaterialTopTabNavigator(
  {
    NotificacoesEventos: {
      screen: NotificacoesEventos,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <FAIcon name="map-marked-alt" size={24} color={tintColor} />
      }
    },
    NotificacoesSolicitacoes: {
      screen: NotificacoesSolicitacoes,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <FAIcon name="users" size={24} color={tintColor} />
      }
    }
  },
  {
    initialRouteName: 'NotificacoesEventos',
    tabBarOptions: {
      upperCaseLabel: false,
      inactiveTintColor: "#aaa",
      activeTintColor: colors.primaryColor,
      pressColor: colors.primaryColor,
      showLabel: false,
      showIcon: true,
      indicatorStyle: {
        backgroundColor: colors.primaryColor
      },
      style: {
        backgroundColor: '#fff',
      },
    }
  }
)