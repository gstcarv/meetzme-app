import React, { Component } from 'react'

import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation'

import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';

// Screens
import Principal from './screens/Principal'
import Login from './screens/Principal/Login'
import Cadastro from './screens/Principal/Cadastro'
import FinalizaCadastro from './screens/Principal/Cadastro/FinalizaCadastro'

import FAIcon from 'react-native-vector-icons/FontAwesome5'
import SLIcon from 'react-native-vector-icons/SimpleLineIcons'

import colors from '@/resources/colors'

const Guest = createStackNavigator(
  {
    Principal: {
      screen: Principal
    },
    Login: {
      screen: Login
    },
    Cadastro: {
      screen: Cadastro
    },
    FinalizaCadastro: {
      screen: FinalizaCadastro
    }
  },
  {
    headerMode: 'none',
    initialRouteName: "Login",
    transitionConfig: getSlideFromRightTransition
  }
)

// Screens
import Dashboard from './screens/Dashboard'
import Eventos from './screens/Eventos'
import Contatos from './screens/Contatos'
import Procurar from './screens/Procurar'

import TabBarMainButton from './components/TabBarMainButton'
import MainToolbar from '@/components/MainToolbar'

const Logado = createBottomTabNavigator(
  {
    Dashboard: {
      screen: Dashboard,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <SLIcon name="rocket" size={20} color={tintColor} />
        )
      }
    },
    Eventos: {
      screen: Eventos,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <FAIcon name="map-marker-alt" size={20} color={tintColor} />
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
          <FAIcon name="address-book" size={20} color={tintColor} />
        )
      }
    },
    Procurar: {
      screen: Procurar,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <SLIcon name="magnifier" size={20} color={tintColor} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      showLabel: false,
      inactiveTintColor: "#D6D6D6",
      activeTintColor: colors.primaryDark
    }
  }
)

const Routes = createSwitchNavigator(
  {
    Guest,
    Logado
  },
  {
    initialRouteName: 'Guest'
  }
)

export default createAppContainer(Routes)