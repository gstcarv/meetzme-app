import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import React, { Component } from 'react'
import { Text, StyleSheet, View, Animated } from 'react-native'

import strings from '@/resources/strings'
import fonts from '@/resources/fonts'

export default class GooglePlacesSearch extends Component {

  constructor(){
    super();
    this.searchTranslateValue = new Animated.Value(0)
  }

  hide(){
    Animated.timing(this.searchTranslateValue, {
      toValue: -130,
      duration: 1000,
      delay: 300,
      useNativeDriver: true
    }).start()
  }

  show(){
    Animated.spring(this.searchTranslateValue, {
      toValue: 0,
      duration: 1000,
      bounciness: 12,
      useNativeDriver: true
    }).start()
  }

  render() {
    return (
      <Animated.View style={{
        position: 'absolute',
        top: 60,
        width: "100%",
        transform: [
          {
            translateY: this.searchTranslateValue
          }
        ]
      }}>
        <GooglePlacesAutocomplete
          placeholder="Insira o Endereço do Local"
          placeholderTextColor="#ccc"
          onPress={(data, details) => {
            this.props.onSelectLocation(data, details)
          }}
          query={{
            key: strings.GoogleMapsKey,
            language: 'pt'
          }}
          returnKeyType={'search'}
          minLength={2}
          textInputProps={{
            autoCorrect: false
          }}
          fetchDetails
          styles={styles}
          enablePoweredByContainer={false}
          listViewDisplayed={false} />
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  textInputContainer: {
    flex: 1,
    backgroundColor: "transparent",
    height: 54,
    marginHorizontal: 20,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  textInput: {
    height: 54,
    margin: 0,
    borderRadius: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
    borderWidth: 1,
    borderColor: "#DDD",
    fontSize: 15,
    fontFamily: fonts.primary,
    borderRadius: 3
  },
  listView: {
    borderWidth: 0,
    borderColor: "#DDD",
    backgroundColor: "#FFF",
    marginHorizontal: 20,
    fontFamily: fonts.primary
  },
  description: {
    fontSize: 13
  },
  row: {
    padding: 10,
    // height: 30
  }
})
