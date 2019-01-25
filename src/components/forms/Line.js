import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class Line extends Component {
  render() {
    return (
      <View style={{
        width: this.props.width || "50%",
        alignSelf: "center",
        height: this.props.height || 1,
        backgroundColor: this.props.color || "#E8E8E8",
        marginTop: this.props.spaceVertical || 10,
        marginBottom: this.props.spaceVertical || 10,
      }}></View>
    )
  }
}
