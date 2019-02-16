import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import {
  FAB
} from 'react-native-paper'

export default class FitFloatButton extends Component {

  constructor(){

  }

  render() {
    return (
      <FAB 
        icon="directions"
        style={styles.fab}
      />
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
