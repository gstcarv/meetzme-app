import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View,
  StatusBar
} from 'react-native'

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

import GooglePlacesSearch from '@/components/NovoEvento/GooglePlacesSearch'
import MapDirections from '@/components/NovoEvento/MapDirections'

import colors from '@/resources/colors'

export default class NovoEvento extends Component {

  constructor() {
    super();
    this.state = {
      userLocation: {
        latitude: 0,
        longitude: 0
      },
      destination: null
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      pos => {
        this.setState({
          userLocation: pos.coords
        })
      },
      err => {
        console.log(err)
      },
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    )
  }

  onSelectLocation(data, { geometry }) {
    this.setState({
      destination: {
        latitude: geometry.location.lat,
        longitude: geometry.location.lng
      }
    })
    console.log(this.state.destination)
  }

  render() {

    const userRegion = {
      latitude: this.state.userLocation.latitude,
      longitude: this.state.userLocation.longitude,
      latitudeDelta: 0.0143,
      longitudeDelta: 0.0134,
    }

    const getDirection = () => {
      if (this.state.destination) {
        return (
          <View>
            <MapDirections origin={this.state.userLocation}
              destination={this.state.destination}
              onReady={result => {
                this.mapview.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    left: 30,
                    right: 30,
                    top: 30,
                    bottom: 30
                  }
                })
              }} />
            <MapView.Marker title="Destino"
              description="Meu destino"
              coordinate={this.state.destination}
              pinColor="indigo" />
          </View>
        )
      }
    }

    return (
      <View style={styles.container}>
        <StatusBar translucent
          animated
          backgroundColor="rgba(255, 255, 255, 0)"
          barStyle="dark-content" />
        <MapView style={styles.mapview}
          ref={
            ref => this.mapview = ref
          }
          provider={PROVIDER_GOOGLE}
          region={userRegion}
          loadingEnabled
          showsUserLocation
          showsMyLocationButton={false}
          showsCompass={false}
          showsBuildings={false}
          customMapStyle={require("@assets/mapstyle.json")}>

          {
            getDirection()
          }

        </MapView>
        <GooglePlacesSearch onSelectLocation={this.onSelectLocation.bind(this)} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mapview: {
    flex: 1,
  }
})
