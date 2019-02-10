import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  AsyncStorage
} from 'react-native'

import { Marker } from 'react-native-maps'

import TouchableScale from 'react-native-touchable-scale'

export default class UserMapMarker extends Component {

  constructor() {
    super();
    this.state = {
      profileImage: null
    }
  }

  componentDidMount() {
    const userData = AsyncStorage.getItem('USER_DATA')
      .then(user => {
        user = JSON.parse(user)
        this.setState({
          profileImage: user.photoURL
        });
      })
  }

  render() {

    const { color } = this.props

    return (
      <Marker coordinate={this.props.coordinate}
        title={this.props.title || ""}
        description={this.props.description || null}
        anchor={{x: 0.5, y: 0.5}}>
        <View>
          <View style={[styles.wave, styles.wave1]}>
            <View style={[styles.wave, styles.wave2]}>
              <View style={[styles.wave, styles.wave3]}>
                <ImageBackground 
                  source={{ uri: this.state.profileImage }}
                  imageStyle={{ borderRadius: 100}}
                  style={styles.image}>
                  <View style={styles.locationIndicator}></View>  
                </ImageBackground>
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
    backgroundColor: "#4285F4"
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
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
