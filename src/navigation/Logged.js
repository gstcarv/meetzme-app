import React, { Component } from 'react'

import { 
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation'

import { fromBottom } from 'react-navigation-transitions';

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
import TabBarComponent from '@/components/TabBar/TabBarComponent'

var BottomNavigator = createBottomTabNavigator(
  {
    Dashboard: {
      screen: Dashboard,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <SLIcon name="rocket" size={24} color={tintColor} />
      }
    },
    Eventos: {
      screen: Eventos,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <FAIcon name="map-marker-alt" size={24} color={tintColor} />
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
        tabBarIcon: ({ tintColor }) => <FAIcon name="address-book" size={24} color={tintColor} />
      }
    },
    Procurar: {
      screen: Procurar,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <SLIcon name="magnifier" size={24} color={tintColor} />
      }
    }
  },
  {
    tabBarComponent: TabBarComponent,
    initialRouteName: "Dashboard",
    lazy: false,
    tabBarOptions: {
      inactiveTintColor: "#D6D6D6",
      activeTintColor: colors.primaryColor
    }
  }
)

// Screens
import NovoEvento from '@/screens/NovoEvento'
import Notificacoes from '@/screens/Notificacoes'
import SelecionarLocalizacao from '@/screens/NovoEvento/SelecionarLocalizacao'
import SelecionarConvidados from '@/screens/NovoEvento/SelecionarConvidados'

export default createStackNavigator(
  {
    Home: BottomNavigator,
    Notificacoes,
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