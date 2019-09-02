import React, { Component } from 'react'
import { StyleSheet, View, Animated, Alert, TouchableNativeFeedback } from 'react-native'

import { Text } from 'react-native-paper'

import RNGooglePlaces from 'react-native-google-places'

export default class GooglePlacesSearch extends Component {

  constructor() {
    super();
    this.searchTranslateValue = new Animated.Value(0)
    this.state = {
      locationName: null
    }
  }

  hide() {
    Animated.timing(this.searchTranslateValue, {
      toValue: -140,
      duration: 1000,
      delay: 300,
      useNativeDriver: true
    }).start()
  }

  show() {
    Animated.spring(this.searchTranslateValue, {
      toValue: 0,
      duration: 1000,
      bounciness: 12,
      useNativeDriver: true
    }).start()
    this.setState({ locationName: null })
  }

  openPlacePicker() {
    RNGooglePlaces.openAutocompleteModal({
      country: 'BR',
    }, ['location', 'name', 'address'])
      .then(place => {
        this.setState({ locationName: place.name })
        this.props.onSelectLocation(place)
      })
  }

  render() {
    return (
      <Animated.View style={{
        paddingHorizontal: 20,
        position: 'absolute',
        top: 80,
        width: "100%",
        transform: [
          {
            translateY: this.searchTranslateValue
          }
        ]
      }}>
        <TouchableNativeFeedback style={styles.textInputContainer} onPress={() => this.openPlacePicker()}>
          <View style={styles.textInput}>
            {
              this.state.locationName &&
              <Text style={styles.locationName}>{this.state.locationName}</Text>
            }
            {
              !this.state.locationName &&
              <Text style={styles.text}>{this.state.locationName}Digite o nome do local</Text>
            }
          </View>
        </TouchableNativeFeedback>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  textInputContainer: {
    flex: 1,
    backgroundColor: "transparent",
    height: 54,
    borderTopWidth: 0,
    borderBottomWidth: 0
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
    elevation: 8,
    backgroundColor: "#fff",
    borderRadius: 3,
    justifyContent: 'center'
  },
  text: {
    color: "#cacaca",
    fontSize: 15
  },
  locationName: {
    color: "#212121",
    fontSize: 15
  }
})
