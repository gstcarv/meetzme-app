import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import {
  Text,
  IconButton,
  Avatar,
} from 'react-native-paper'

export default class BottomSheetHeader extends Component {
  render() {

    let uri = "https://static.collectui.com/shots/4264540/parking-finder-screen-3-medium"

    return (
      <View style={styles.header}>

        <IconButton
          icon="arrow-back"
          color="#fff"
          onPress={this.props.onReturnButtonPress}
        />

        <IconButton
          icon="menu"
          color="#fff"
          onPress={this.props.onMenuIconPress}
        />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 10
  }
})
