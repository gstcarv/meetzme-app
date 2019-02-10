import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

import MapViewDirections from 'react-native-maps-directions'

import string from '@/resources/strings'
import colors from '@/resources/colors'

export default class MapDirections extends Component {
  render() {

    const {
      destination,
      origin,
      onReady
    } = this.props;

    return (
      <MapViewDirections
        origin={origin}
        destination={destination}
        onReady={onReady}
        apikey={string.GoogleMapsKey}
        language="pt"
        strokeWidth={7}
        strokeColor={colors.primaryColor}
      />
    )
  }
}

const styles = StyleSheet.create({})
