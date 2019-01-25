import React, { Component } from 'react'
import {
  Text, StyleSheet, View,
  TextInput
} from 'react-native'

import fonts from "@/resources/fonts"

export default class TextField extends Component {

  onWrite(text){
    if(this.props.onWrite){
      this.props.onWrite(text);
    } else {
      console.warn("Expected onWrite function");
    }
  }

  render() {

    let icon;

    if(this.props.children){
      icon.this.props.children
    }

    return (
      <View style={[styles.container, this.props.style]}>
        <Text style={styles.labelStyle}>{this.props.labelText || "Label Text"}</Text>
        <View style={{flexDirection: "row", alignItems: "center"}}>
          {icon}
          <TextInput placeholder={this.props.placeholder || ""}
                    placeholderTextColor="#ddd"
                    style={styles.textInput}
                    maxLength={this.props.maxLenght}
                    multiline={this.props.maxLenght}
                    secureTextEntry={this.props.password}
                    onChangeText={(text) => this.onWrite(text)}
                    keyboardType={this.props.type}
                    autoFocus={this.props.autoFocus}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 6
  },
  labelStyle: {
    position: "absolute",
    top: -10,
    left: 10,
    paddingHorizontal: 6,
    backgroundColor: "#fff",
    fontFamily: fonts.primaryBold,
    color: "#bbb",
  },
  textInput: {
    paddingHorizontal: 13,
    fontFamily: fonts.primary,
    color: "#929292",
    width: "100%"
  }
})
