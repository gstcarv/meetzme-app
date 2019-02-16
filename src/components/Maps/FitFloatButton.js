import React, { Component } from 'react'
import { Animated, StyleSheet, View, Easing } from 'react-native'
import {
  FAB
} from 'react-native-paper'

export default class FitFloatButton extends Component {

  constructor() {
    super()
    this.translateRight = new Animated.Value(100);
  }

  show() {
    Animated.spring(this.translateRight, {
      toValue: 0,
      duration: 750,
      bounciness: 20,
      delay: 2000,
      useNativeDriver: true
    }).start();
  }

  hide() {
    Animated.timing(this.translateRight, {
      toValue: 100,
      duration: 750,
      Easing: Easing.ease,
      useNativeDriver: true
    }).start()
  }

  render() {
    return (
      <Animated.View style={[styles.fab, {
        transform: [
          {
            translateX: this.translateRight
          }
        ]
      }]}>
        <FAB
          icon="directions"
          onPress={this.props.onPress}
        />
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 300,
    right: 15
  }
})
