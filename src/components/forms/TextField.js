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

  focus(){
    this.refs.textInputRef.focus()
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
                    placeholderTextColor="#dbdbdb"
                    style={styles.textInput}
                    maxLength={this.props.maxLenght}
                    multiline={this.props.multiline}
                    secureTextEntry={this.props.password}
                    onChangeText={(text) => this.onWrite(text)}
                    keyboardType={this.props.type}
                    autoFocus={this.props.autoFocus}
                    autoCorrect={false}
                    autocomplete="off"
                    blurOnSubmit={ this.props.onGoNext == null ? true : false }
                    returnKeyType={ this.props.onGoNext == null ? 'done' : 'next' }
                    onFocus={ this.props.onFocus }
                    onSubmitEditing={() => {
                      if(this.props.onGoNext) this.props.onGoNext()
                    }}
                    ref="textInputRef"
                    {...this.props.textInput}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6
  },
  labelStyle: {
    position: "absolute",
    top: -10,
    left: 10,
    paddingHorizontal: 6,
    backgroundColor: "#fff",
    fontFamily: fonts.primaryBold,
    color: "#ddd",
  },
  textInput: {
    paddingHorizontal: 13,
    fontFamily: fonts.primary,
    color: "#929292",
    width: "100%",
    fontSize: 16
  }
})
