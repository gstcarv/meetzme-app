import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

import { TextInput } from 'react-native-paper'

export default class TextField extends Component {
  render() {
    return (
      <TextInput {...this.props} 
          theme={{ roundness: 6 }}
          mode="outlined" />   
    )
  }
}

const styles = StyleSheet.create({})
