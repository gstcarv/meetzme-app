import React, { Component } from 'react'
import {
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableNativeFeedback,
  View
} from 'react-native'
import RippleView from 'react-native-material-ripple'

import fonts from '@/resources/fonts'

export default class Button extends Component {
  
  onPress() {
    if (this.props.onPress) {
      if(!this.props.loading){
        this.props.onPress()
      }
    } else {
      console.warn("Expected OnPress Function");
    }
  }

  render() {

    let propStyles = {}
    let textPropStyle = {}

    if (this.props.fullWidth) {
      propStyles.width = "100%"
      textPropStyle.textAlign = "center"
    }

    if (this.props.textBold) {
      textPropStyle.fontFamily = fonts.primaryBold
    }

    if (this.props.rounded) {
      propStyles.borderRadius = 100
    } else {
      if(this.props.noBorder){
        propStyles.borderRadius = 0
      }
    }

    propStyles.backgroundColor = this.props.background || "#fff";
    textPropStyle.color = this.props.color || "#000"
    textPropStyle.fontSize = this.props.fontSize || 15

    if (this.props.width) {
      propStyles.width = this.props.width
    }

    if (this.props.outline) {
      propStyles.backgroundColor = "transparent"
      propStyles.borderWidth = 1
      propStyles.borderColor = this.props.color || "#000"
    }

    if(this.props.loading){
      propStyles.opacity = .6
    }

    propStyles.padding = 14;

    if(this.props.small){
      propStyles.padding = 10
    }

    return (
      <RippleView style={[styles.container, propStyles, this.props.style]}
        onPress={() => this.onPress()}
        rippleDuration={650}
        rippleOpacity={.6}>
        {
          (
            () => {
              if(this.props.loading){
                return <ActivityIndicator size="small" color="#fff"/>
              } else {
                return <Text style={[styles.textStyle, textPropStyle]}>{this.props.children || "My Button"}</Text>
              }
            }
          )()
        }
      </RippleView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    backgroundColor: 'white',
    borderRadius: 3,
    overflow: 'hidden'
  },
  textStyle: {
    fontFamily: fonts.primary,
    color: '#000',
    textAlign: 'center'
  }
})
