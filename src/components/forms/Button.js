import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { Button } from 'react-native-paper';

export default class AppButton extends Component {
  render() {

    const getRadius = () => {
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

    const getPadding = () => {
      if(this.props.small) return 2
      else return 7
    }

    return (
      <Button {...this.props} 
        style={
          [ this.props.style, 
            { 
              overflow: 'hidden',
              borderRadius: getRadius(),
              paddingVertical: getPadding()
            }
          ]
        }>{this.props.children}</Button>
    )
  }
}

const styles = StyleSheet.create({
})
