import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { Button } from 'react-native-paper';

export default class AppButton extends Component {
  render() {

    const getButtonRadius = () => {
      if(this.props.noRadius == true){
        return 0
      } else {
        if(this.props.rounded){
          return 100
        } else {
          return 3
        }
      } 
    }

    return (
      <Button {...this.props} 
        style={
          [ this.props.style, 
            styles.buttonContainer, 
            { borderRadius: getButtonRadius() }
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
