import React, { Component } from 'react'

import colors from '@/resources/colors'
import fonts from '@/resources/fonts'

import { 
  createMaterialTopTabNavigator
} from 'react-navigation'

import FAIcon from 'react-native-vector-icons/FontAwesome5'
import MIcon from 'react-native-vector-icons/MaterialIcons'

// Screens
import NotificacoesEventos from './NotificacoesEventos'
import NotificacoesContatos from './NotificacoesContatos'

export default createMaterialTopTabNavigator(
  {
    NotificacoesEventos: {
      screen: NotificacoesEventos,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <FAIcon name="map-marked-alt" size={24} color={tintColor} />
      }
    },
    NotificacoesContatos: {
      screen: NotificacoesContatos,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <FAIcon name="user-circle" size={26} color={tintColor} />
      }
    }
  },
  {
    initialRouteName: 'NotificacoesEventos',
    tabBarOptions: {
      upperCaseLabel: false,
      inactiveTintColor: colors.primaryColor,
      activeTintColor: colors.primaryColor,
      pressColor: colors.primaryColor,
      showLabel: false,
      showIcon: true,
      indicatorStyle: {
        backgroundColor: colors.primaryColor,
        height: 1   
      },
      style: {
        backgroundColor: '#fff',
        paddingVertical: 5,
        elevation: 2
      },
    }
  }
)