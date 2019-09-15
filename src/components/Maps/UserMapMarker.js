import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Image
} from 'react-native'

import { Marker, Callout } from 'react-native-maps'

import TouchableScale from 'react-native-touchable-scale'

import LoggedUserStore from '@/store/LoggedUserStore'

export default class UserMapMarker extends Component {

  constructor() {
    super();
    this.state = {
      locationName: null
    }
  }

  render() {

    const userData = LoggedUserStore.get()

    return (
      <Marker coordinate={this.props.coordinate}
        title={this.props.title || ""}
        description={this.state.locationName}
        anchor={{ x: 0.5, y: 0.5 }}
        tracksViewChanges={false}>
        <View>
          <View style={[styles.wave, styles.wave1]}>
            <View style={[styles.wave, styles.wave2]}>
              <View style={[styles.wave, styles.wave3]}>
                <Image
                  source={{ uri: userData.photoURL }}
                  imageStyle={{ borderRadius: 100 }}
                  style={styles.image}>
                </Image>
                <View style={styles.locationIndicator}></View>
              </View>
            </View>
          </View>
        </View>
      </Marker>
    )
  }
}

const styles = StyleSheet.create({
  locationIndicator: {
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "#fff",
    width: 13,
    height: 13,
    backgroundColor: "#80a6e8",
    position: 'absolute'
  },
  wave: {
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wave1: {
    width: 105,
    height: 105,
    backgroundColor: 'rgba(128, 166, 232, .2)',
    margin: 3
  },
  wave2: {
    width: 90,
    height: 90,
    backgroundColor: 'rgba(128, 166, 232, .4)'
  },
  wave3: {
    width: 75,
    height: 75,
    backgroundColor: 'rgba(128, 166, 232, .5)'
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 100
  }
})
