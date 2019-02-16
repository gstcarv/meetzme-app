import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Animated,
  ActivityIndicator
} from 'react-native'

import SLIcon from 'react-native-vector-icons/SimpleLineIcons'

import colors from '@/resources/colors'
import fonts from '@/resources/fonts'

export default class SearchToolbar extends Component {

  constructor() {
    super()
    this.paddingValue = new Animated.Value(10)
  }

  _onFocus() {
    Animated.spring(this.paddingValue, {
      toValue: 20,
      duration: 500,
      bounciness: 23
    }).start()
  }

  _onBlur() {
    Animated.spring(this.paddingValue, {
      toValue: 10,
      duration: 500,
      bounciness: 23
    }).start()
  }

  render() {
    return (
      <Animated.View style={[styles.container, {
        padding: this.paddingValue
      }]}>
        <View style={styles.textInputContainer}>
          <View>
            <SLIcon name="magnifier" size={24} color={"#fff"} />
          </View>
          <View style={{ width: '100%' }}>
            <TextInput
              placeholder="Digite o nome do Contato"
              placeholderTextColor="#fff"
              style={styles.textInput}
              onFocus={this._onFocus.bind(this)}
              onBlur={this._onBlur.bind(this)}
              onChangeText={this.props.onChangeText}
              autoCorrect={false}
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
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryDark,
    padding: 10,
    elevation: 4
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 15,
    overflow: 'hidden'
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
