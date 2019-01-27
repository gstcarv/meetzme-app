import React, { Component } from 'react'
import { Alert, Text, StyleSheet, View, TouchableNativeFeedback } from 'react-native'

import RippleView from 'react-native-material-ripple'
import FAIcon from 'react-native-vector-icons/FontAwesome5'

import TouchableScale from 'react-native-touchable-scale'

import colors from '@/resources/colors'

export default class TabBarMainButton extends Component {
  render() {
    return (
      <TouchableScale background={TouchableNativeFeedback.SelectableBackground()}>
        <View style={styles.button} onPress={() => Alert.alert("ok")}>
          <FAIcon name="plus" size={16} color="#fff" />
        </View>
      </TouchableScale>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    height: 60,
    width: 60,
    backgroundColor: colors.primaryColor,
    borderRadius: 100,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 9,
    transform: [
        { translateY: -10 }
    ]
    
  }
})
