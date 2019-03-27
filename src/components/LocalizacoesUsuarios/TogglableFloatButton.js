import React, { Component } from 'react'
import { Animated, StyleSheet, View, Easing } from 'react-native'
import {
  FAB
} from 'react-native-paper'

const AnimatedFAB = Animated.createAnimatedComponent(FAB)

export default class TogglebleFloatButton extends Component {

  constructor() {
    super()
    this.translateRight = new Animated.Value(100);
  }

  show(delay) {
    Animated.spring(this.translateRight, {
      toValue: 0,
      duration: 750,
      bounciness: 20,
      delay: delay || 0,
      useNativeDriver: true
    }).start();
  }

  hide(delay) {
    Animated.timing(this.translateRight, {
      toValue: 100,
      duration: 450,
      Easing: Easing.ease,
      delay: delay || 0,
      useNativeDriver: true
    }).start()
  }

  render() {
    return (
      <AnimatedFAB
        style={[styles.fab, {
          bottom: this.props.bottom,
          transform: [
            {
              translateX: this.translateRight
            }
          ]
        }]}
        {...this.props}
        onPress={this.props.onPress}
      />
    )
  }
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 15,
  }
})
