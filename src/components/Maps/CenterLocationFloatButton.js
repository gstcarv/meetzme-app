import React, { Component } from 'react'
import { Animated, StyleSheet, View, Easing } from 'react-native'
import {
  FAB
} from 'react-native-paper'

export default class CenterLocationButton extends Component {

  constructor() {
    super()
    this.translateRight = new Animated.Value(100);
  }

  show() {
    Animated.spring(this.translateRight, {
      toValue: 0,
      duration: 750,
      bounciness: 20,
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
          icon="gps-fixed"
          onPress={this.props.onPress}
          theme={{
            colors: {
              accent: '#80A6E8'
            }
          }}
        />
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 15,
    right: 15
  }
})
