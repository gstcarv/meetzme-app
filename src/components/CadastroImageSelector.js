import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import RippleView from 'react-native-material-ripple'
import Icon from 'react-native-vector-icons/FontAwesome5'

export default class CadastroImageSelector extends Component {
  render() {
    return (
      <View style={styles.container}>
        <RippleView style={styles.thumbnail}></RippleView>
        <RippleView style={styles.cameraIcon}>
          <Icon name="camera" size={20} color="white" />
        </RippleView>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 100,
    width: 200,
    height: 200,
    alignSelf: 'center',
    elevation: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    backgroundColor: "#353F4B",
    padding: 20,
    borderRadius: 100,
    position: 'absolute',
    right: 0,
    bottom: 0,
    overflow: 'hidden'
  },
  thumbnail: {
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    borderRadius: 100
  }
})
