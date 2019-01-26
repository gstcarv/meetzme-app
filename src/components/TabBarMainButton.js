import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

import RippleView from 'react-native-material-ripple'
import FAIcon from 'react-native-vector-icons/FontAwesome5'

import colors from '@/resources/colors'

export default class TabBarMainButton extends Component {
  render() {
    return (
      <RippleView style={styles.button}>
        <FAIcon name="plus" size={16} color="#fff" />
      </RippleView>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    height: 40,
    width: 40,
    backgroundColor: colors.primaryColor,
    borderRadius: 100,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 9,
    borderColor: 'white'
  }
})
