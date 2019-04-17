import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import { TextInput, HelperText } from 'react-native-paper'

export default class TextField extends Component {
  render() {
    return (
      <View>
        <TextInput {...this.props}
          theme={{ roundness: 6 }}
          mode="outlined" />
        {
          this.props.error &&
          <HelperText
            type="error"
            style={{ marginBottom: 5 }}
          >
            {this.props.error || ""}
          </HelperText>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({})
