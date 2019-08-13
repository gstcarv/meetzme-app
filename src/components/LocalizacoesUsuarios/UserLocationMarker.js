import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Image
} from 'react-native'

import { Marker, Callout } from 'react-native-maps'

import UserLocationCallout from './UserLocationMarker/UserLocationCallout'

import colors from '@/resources/colors'

import LoggedUserStore from '@/store/LoggedUserStore'

export default class UserLocationMarker extends Component {

  constructor() {
    super();
    this.state = {
      tracksViewChanges: true
    }
  }

  update({ latitude, longitude }){
    this.calloutRef.updateInfo({
      latitude, longitude
    })
    this.markerRef.animateMarkerToCoordinate({
      latitude,
      longitude,
      duration: 2500
    })
  }

  render() {

    const userData = LoggedUserStore.get()

    return (
      <Marker coordinate={this.props.coordinate}
        calloutOffset={{ x: -50, y: 28 }}
        tracksViewChanges={false}
        ref={
          ref => this.markerRef = ref
        }>
        <View>
          {
            true &&
            <View style={{
              height: 63,
            }}>
              <View style={styles.markerContainer}>
                <Image
                  source={{ uri: this.props.image }}
                  imageStyle={{ borderRadius: 100 }}
                  style={[styles.otherUserImage]} />
              </View>
            </View>
          }
        </View>
        <UserLocationCallout 
          {...this.props}
          renderAgain={() => {
          
          }}
          ref={
            ref => this.calloutRef = ref
          }
        />
      </Marker>
    )
  }
}

const styles = StyleSheet.create({
  locationIndicator: {
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "#fff",
    width: 6,
    height: 6,
    backgroundColor: "#80a6e8",
    position: 'absolute'
  },
  wave: {
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wave1: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(128, 166, 232, .2)',
    margin: 3
  },
  wave2: {
    width: 65,
    height: 65,
    backgroundColor: 'rgba(128, 166, 232, .4)'
  },
  wave3: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(128, 166, 232, .5)'
  },
  image: {
    width: 35,
    height: 35,
    borderRadius: 100
  },
  otherUserImage: {
    borderColor: colors.primaryDark,
    transform: [
      {
        rotate: "-45deg"
      }
    ],
    width: 40,
    height: 40,
    borderRadius: 100
  },
  markerContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primaryColor,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    borderBottomLeftRadius: 100,
    transform: [
      {
        rotate: "45deg"
      }
    ],
  },
})
