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

  constructor(props) {
    super();
    this.state = {
      tracksViewChanges: false,
      isDisabled: props.isDisabled || false
    }
  }

  async update({ latitude, longitude, isRunningLocation }) {
    this.setState({
      isDisabled: isRunningLocation != true ? true : false
    })

    if (isRunningLocation != true) return

    this.calloutRef.updateInfo({
      latitude, longitude
    })
    this.markerRef.animateMarkerToCoordinate({
      latitude,
      longitude,
      duration: 4500
    })
  }


  render() {

    const getMarkerBackgroundColor = () => {
      if (this.state.isDisabled) {
        return '#bfbfbf'
      } else {
        return colors.primaryColor
      }
    }

    console.tron.log(this.props)

    const loggedUserData = LoggedUserStore.get()

    let isTheLoggedUser = loggedUserData.uid == this.props.uid;

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
              <View style={[styles.markerContainer, {
                backgroundColor: getMarkerBackgroundColor()
              }]}>
                <Image
                  source={{ uri: this.props.image }}
                  imageStyle={{ borderRadius: 100 }}
                  style={[styles.otherUserImage]} />

                {
                  this.state.isDisabled &&
                  <Image
                    source={{ uri: this.props.image }}
                    imageStyle={{ borderRadius: 100 }}
                    style={[styles.otherUserImage, styles.grayImage]} />
                }

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
  grayImage: {
    position: 'absolute',
    tintColor: 'gray',
    opacity: .7
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
