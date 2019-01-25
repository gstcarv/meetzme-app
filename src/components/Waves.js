import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

export default class Waves extends Component {
  render() {

    const { color } = this.props

    return (
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <View style={[styles.wave, styles.wave3]}>
          <View style={[styles.wave, styles.wave2]}>
            <View style={[styles.wave, styles.wave1]}>
              <View style={styles.element}>{this.props.children}</View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  element: {

  },
  wave: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "rgba(255, 255, 255, .07)",
  },
  wave1: {
    width: 110,
    height: 110,
  },
  wave2: {
    width: 140,
    height: 140,
  },
  wave3: {
    width: 170,
    height: 170,
  },
})
