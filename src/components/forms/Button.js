import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { Button } from 'react-native-paper';

export default class AppButton extends Component {
  render() {
    return (
      <Button {...this.props} 
        style={
          [ this.props.style, 
            styles.buttonContainer, 
            { borderRadius: this.props.rounded ? 100 : 3 }
          ]
        }>{this.props.children}</Button>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    paddingVertical: 7,
  }
})
