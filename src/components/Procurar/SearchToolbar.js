import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Animated,
  ActivityIndicator,
  Dimensions
} from 'react-native'

import SLIcon from 'react-native-vector-icons/SimpleLineIcons'

import colors from '@/resources/colors'
import fonts from '@/resources/fonts'

export default class SearchToolbar extends Component {

  constructor() {
    super()
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.textInputContainer]}>
          <View>
            <SLIcon name="magnifier" size={24} color={"#fff"} />
          </View>
          <View style={{ width: '100%' }}>
            <TextInput
              placeholder="Digite o nome do Contato"
              placeholderTextColor="#fff"
              style={styles.textInput}
              onChangeText={this.props.onChangeText}
              autoCorrect={false}
              autoComplete="off"
              returnKeyType="search"
              autoFocus
            />
          </View>
          {
            this.props.loading == true &&
            <ActivityIndicator
              style={styles.loading}
              color="#fff"
            />
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryDark,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 15,
    overflow: 'hidden',
    width: '97%',
    borderRadius: 3
  },
  textInput: {
    fontFamily: fonts.primary,
    marginLeft: 15,
    width: '100%',
    color: "#fff"
  },
  loading: {
    position: 'absolute',
    right: 10
  }
})
