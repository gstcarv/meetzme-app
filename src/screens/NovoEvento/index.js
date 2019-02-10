import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  AsyncStorage,
} from 'react-native'

import BackButton from '@/components/BackButton'

import Snackbar from 'react-native-snackbar'

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

import GooglePlacesSearch from '@/components/NovoEvento/GooglePlacesSearch'
import MapDirections from '@/components/NovoEvento/MapDirections'

import colors from '@/resources/colors'
import DirectionInfoBox from '@/components/Maps/DirectionInfoBox';

export default class NovoEvento extends Component {

  constructor() {
    super();
    this.state = {
      userLocation: {
        latitude: 0,
        longitude: 0
      },
      loading: true,
      destination: null
    }
  }

  componentDidMount() {

    this.loading = true;

    navigator.geolocation.getCurrentPosition(
      async pos => {
        this.setState({
          userLocation: pos.coords,
          loading: false
        })
        await AsyncStorage.setItem("USER_LAST_LOCATION", JSON.stringify(pos.coords));
      },
      async err => {

        Snackbar.show({
          title: 'Ocorreu um erro ao determinar sua localização atual',
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: '#b71b25'
        })

        const userLastLocation = await AsyncStorage.getItem("USER_LAST_LOCATION");
        if (userLastLocation) {
          this.setState({
            userLocation: JSON.parse(userLastLocation),
            loading: false
          })
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 },
    )
  }

  onSelectLocation(data, { geometry }) {
    this.setState({
      destination: {
        latitude: geometry.location.lat,
        longitude: geometry.location.lng
      }
    })
  }

  openBox(){
    this.DirectionInfoBox.show();
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
                    left: 100,
                    right: 100,
                    top: 300,
                    bottom: 600
                  }
                })
                this.openBox();
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

        <StatusBar
          animated
          backgroundColor="rgba(255, 255, 255, 0)"
          barStyle="dark-content" />

        {

          this.state.loading == false && <MapView style={styles.mapview}
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

        }

        <GooglePlacesSearch onSelectLocation={this.onSelectLocation.bind(this)} />

        <DirectionInfoBox ref={
          ref => this.DirectionInfoBox = ref
        }/>

        <BackButton color={colors.primaryColor} />

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
