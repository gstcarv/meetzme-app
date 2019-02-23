import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Modal,
  Text,
  StatusBar
} from 'react-native'

import colors from '@/resources/colors'
import fonts from '@/resources/fonts'

export default class LoadingModal extends Component {
  render() {
    return (
      <Modal animationType="slide"
        transparent={false}
        {...this.props}>
        <View style={styles.modalStyle}>
          <StatusBar 
            animated
            backgroundColor={colors.primaryDark}
          />
          <Text style={styles.loaderTitle}>Criando seu evento...</Text>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modalStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primaryColor,
  },
  loaderTitle: {
    color: '#fff',
    fontSize: 30,
    marginBottom: 26,
    fontFamily: fonts.primary
  }
})
