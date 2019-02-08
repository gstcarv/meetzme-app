import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

import colors from '@/resources/colors'
import fonts from '@/resources/fonts'

import { 
  createMaterialTopTabNavigator,
  withNavigation,
  createAppContainer
} from 'react-navigation'

import MainToolbar from '@/components/MainToolbar'

export default createMaterialTopTabNavigator(
  {
    Aceitos: () => <View></View>,
    Pendentes: () => <View></View>
  },
  {
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
        backgroundColor: colors.primaryColor
      },
      style: {
        backgroundColor: '#fff',
      },
    }
  }
)

// class Eventos extends Component {
//   render() {
//     return (
//       <View>
//         <Tabs></Tabs>
//         <MainToolbar>Eventos</MainToolbar>
//       </View>
//     )
//   }
// }


const styles = StyleSheet.create({})

// export default createAppContainer(Eventos)
