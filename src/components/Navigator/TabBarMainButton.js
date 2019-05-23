import React, { Component } from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'

import {
  withNavigation
} from 'react-navigation'

import FAIcon from 'react-native-vector-icons/FontAwesome5'

import TouchableScale from 'react-native-touchable-scale'

import colors from '@/resources/colors'

class TabBarMainButton extends Component {
  render() {
    return (
      <TouchableScale activeScale={.7} onPress={() => this.props.navigation.push('NovoEvento')}>
        <View style={styles.button}>
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

export default withNavigation(TabBarMainButton)