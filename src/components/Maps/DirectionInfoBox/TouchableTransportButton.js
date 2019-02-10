import React, { Component } from 'react'
import { TouchableNativeFeedback, StyleSheet, View } from 'react-native'

import colors from '@/resources/colors'
import FAIcon from 'react-native-vector-icons/FontAwesome5'

export default class TouchableTransportButton extends Component {
  render() {

    var activeStyle = {}
    if(this.props.active){
      activeStyle = {
        backgroundColor: colors.primaryColor
      }
    }

    return (
      <TouchableNativeFeedback backgroundColor={TouchableNativeFeedback.Ripple("#eee", true)}
            onPress={this.props.onPress}>
        <View style={[styles.transportButton, activeStyle]}>
          <FAIcon name={this.props.iconName} size={17} color={this.props.active ? "#fff" : "#DCDCDC"}></FAIcon>
        </View>
      </TouchableNativeFeedback>
    )
  }
}

const styles = StyleSheet.create({
  transportButton: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#ebebeb',
    margin: 5
  }
})
