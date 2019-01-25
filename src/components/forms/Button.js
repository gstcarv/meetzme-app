import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import RippleView from 'react-native-material-ripple'

import fonts from '@/resources/fonts'

export default class Button extends Component {

  onPress(){
    if(this.props.onPress){
      this.props.onPress()
    } else {
      console.warn("Expected OnPress Function");
    }
  }

  render() {

    let propStyles = {}
    let textPropStyle = {}

    if(this.props.fullWidth){
      propStyles.width = "100%"
      textPropStyle.textAlign = "center"
    }

    if(this.props.textBold){
      textPropStyle.fontFamily = fonts.primaryBold
    }

    if(this.props.rounded){
      propStyles.borderRadius = 100
    }

    propStyles.backgroundColor = this.props.background || "#fff";
    textPropStyle.color = this.props.color || "#000"
    textPropStyle.fontSize = this.props.fontSize || 15
    
    if(this.props.width){
      propStyles.width = this.props.width
    }

    if(this.props.outline){
      propStyles.backgroundColor = "transparent"
      propStyles.borderWidth = 1
      propStyles.borderColor = this.props.color || "#000"
    }

    return (
      <RippleView style={[styles.container, propStyles, this.props.style]}
                  onPress={() => this.onPress()}>
        <Text style={[styles.textStyle, textPropStyle]}>{this.props.children || "My Button"}</Text>
      </RippleView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 14,
    width: 200,
    backgroundColor: 'white',
    borderRadius: 3
  },
  textStyle: {
    fontFamily: fonts.primary,
    color: '#000',
    textAlign: 'center'
  }
})
