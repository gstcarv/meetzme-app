import React, { Component } from 'react'

import { createBottomTabNavigator } from 'react-navigation'

import FAIcon from 'react-native-vector-icons/FontAwesome5'
import SLIcon from 'react-native-vector-icons/SimpleLineIcons'

import colors from '@/resources/colors'

// Screens
import Dashboard from '@/screens/Dashboard'
import Eventos from '@/screens/Eventos'
import Contatos from '@/screens/Contatos'
import Procurar from '@/screens/Procurar'

// Components
import TabBarMainButton from '@/components/TabBar/TabBarMainButton'
import BottomTabButton from '@/components/TabBar/BottomTabButton'
import TabBarComponent from '@/components/TabBar/TabBarComponent'

export default createBottomTabNavigator(
  {
    Dashboard: {
      screen: Dashboard,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <BottomTabButton path="Dashboard">
            <SLIcon name="rocket" size={24} color={tintColor} />
          </BottomTabButton>
        )
      }
    },
    Eventos: {
      screen: Eventos,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <BottomTabButton path="Eventos">
            <FAIcon name="map-marker-alt" size={24} color={tintColor} />
          </BottomTabButton>
        )
      }
    },
    NovoEvento: {
      screen: () => null,
      navigationOptions: {
        tabBarIcon: <TabBarMainButton />
      }
    },
    Contatos: {
      screen: Contatos,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <BottomTabButton path="Contatos">
            <FAIcon name="address-book" size={24} color={tintColor} />
          </BottomTabButton>
        )
      }
    },
    Procurar: {
      screen: Procurar,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <BottomTabButton path="Procurar">
            <SLIcon name="magnifier" size={24} color={tintColor} />
          </BottomTabButton>
        )
      }
    }
  },
  {
    tabBarComponent: TabBarComponent,
    tabBarOptions: {
      showLabel: false,
      inactiveTintColor: "#D6D6D6",
      activeTintColor: colors.primaryColor
    }
  }
)