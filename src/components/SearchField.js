import React, { Component } from 'react'
import { TextInput, StyleSheet, View } from 'react-native'
import SLIcon from 'react-native-vector-icons/SimpleLineIcons'

import fonts from '@/resources/fonts'

export default class SearchField extends Component {
  render() {
    return (
      <View style={[styles.fieldContainer, this.props.style || {}]}>
        <SLIcon name="magnifier" size={20} color="#ccc"></SLIcon>
        <TextInput placeholder={this.props.placeholder}
            style={styles.textInput}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  fieldContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E9E9E9',
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 20
  },
  textInput: {
    fontFamily: fonts.primary,
    marginLeft: 15,
    width: '85%',
  }
})
