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

    if(this.props.fullwidth){
      propStyles.width = "100%"
      textPropStyle.textAlign = "center"
    }

    if(this.props.textBold){
      textPropStyle.fontFamily = fonts.primaryBold
    }

    if(this.props.rounded){
      propStyles.borderRadius = 100
    }

    propStyles.background = this.props.background || "#fff";
    propStyles.width = this.props.width || 200;
    textPropStyle.color = this.props.color || "#000"
    textPropStyle.fontSize = this.props.fontSize || 20
    

    if(this.props.outline){
      propStyles.backgroundColor = "transparent"
      propStyles.borderWidth = 1
      propStyles.borderColor = this.props.color || "#000"
    }

    return (
      <RippleView style={[styles.container, propStyles, this.props.style]}
                  onPress={() => this.onPress()}>
        <Text style={[styles.textStyle, textPropStyle]}>{this.props.children}</Text>
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
    fontSize: 15,
    textAlign: 'center'
  }
})
