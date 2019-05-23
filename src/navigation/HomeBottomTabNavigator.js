import React, { Component } from 'react'

import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation'

import FAIcon from 'react-native-vector-icons/FontAwesome5'
import SLIcon from 'react-native-vector-icons/SimpleLineIcons'
import MIcon from 'react-native-vector-icons/MaterialIcons'

import colors from '@/resources/colors'

// Screens
import Dashboard from '@/screens/Dashboard'
import Eventos from '@/screens/Eventos'
import Contatos from '@/screens/Contatos'
import Notificacoes from '@/screens/Notificacoes'

// Components
import TabBarMainButton from '@/components/Navigator/TabBarMainButton'
import TabBarComponent from '@/components/Navigator/TabBarComponent'
import MainToolbar from '@/components/Navigator/MainToolbar'


var BottomNavigator = createBottomTabNavigator({
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
        tabBarIcon: ({ tintColor }) => <FAIcon name="users" size={24} color={tintColor} />
      }
    },
    Notificacoes: {
      screen: Notificacoes,
      navigationOptions: {
        title: "Notificações",
        tabBarIcon: ({ tintColor }) => <MIcon name="notifications" size={27} color={tintColor} />
      },
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

export default createStackNavigator({
    HomeNavigator: {
      screen: BottomNavigator,
      navigationOptions: {
        header: props => <MainToolbar navigationProps={props}/>
      }
    }
  }, { initialRouteName: 'HomeNavigator' }
)