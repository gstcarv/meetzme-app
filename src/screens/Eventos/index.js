import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

import colors from '@/resources/colors'
import fonts from '@/resources/fonts'

import { 
  createMaterialTopTabNavigator,
} from 'react-navigation'

// Screens
import Aceitos from './Aceitos'
import Convites from './Pendentes'

export default createMaterialTopTabNavigator(
  {
    Aceitos,
    Convites
  },
  {
    initialRouteName: 'Aceitos',
    tabBarOptions: {
      upperCaseLabel: false,
      activeTintColor: '#e91e63',
      pressColor: colors.primaryColor,
      labelStyle: {
        color: colors.primaryColor,
        fontFamily: fonts.primaryBold,
        fontSize: 16
      },
      indicatorStyle: {
        backgroundColor: colors.primaryColor,
        height: 1
      },
      style: {
        backgroundColor: '#fff',
        elevation: 2
      },
    }
  }
)


const styles = StyleSheet.create({})
