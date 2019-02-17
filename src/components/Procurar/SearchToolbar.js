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
    this.fullWidth = Dimensions.get('window').width;
    this.textInputHeight = new Animated.Value(80)
    this.textInputWidth = new Animated.Value(this.fullWidth)
  }

  _onFocus() {
    Animated.parallel([
      Animated.timing(this.textInputHeight, {
        toValue: 100,
        duration: 500

      }
      ),
      Animated.timing(this.textInputWidth, {
        toValue: this.fullWidth,
        duration: 500
      }
      )],
      {
        useNativeDriver: true
      }
    ).start();
  }

  _onBlur() {
    Animated.parallel([
      Animated.spring(this.textInputHeight, {
        toValue: 45,
        duration: 500
      }
      ),
      Animated.spring(this.textInputWidth, {
        toValue: this.fullWidth - 20,
        duration: 500
      }
      )],
      {
        useNativeDriver: true
      }
    ).start();
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.textInputContainer, {
          height: this.textInputHeight,
          width: this.textInputWidth
        }]}>
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
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryDark,
    elevation: 4,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
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
