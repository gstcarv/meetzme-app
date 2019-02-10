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
import UserMapMarker from '../../components/Maps/UserMapMarker';
import DestinationMapMarker from '../../components/Maps/DestinationMapMarker';

export default class NovoEvento extends Component {

  constructor() {
    super();
    this.state = {
      userLocation: {
        latitude: 0,
        longitude: 0
      },
      loading: true,
      destination: null,
      transportMode: "walking",
      directionResult: null
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

  onDirectionReady(result) {

    const { distance, duration } = result
    this.setState({
      directionResult: {
        distance,
        duration
      }
    })

    this.mapview.fitToCoordinates(result.coordinates, {
      edgePadding: {
        left: 100,
        right: 100,
        top: 300,
        bottom: 600
      }
    })

    this.openBox();
  }

  openBox() {
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
              mode={this.state.transportMode}
              onReady={this.onDirectionReady.bind(this)} />
            <DestinationMapMarker
              coordinate={this.state.destination}
            />
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
          <MapView style={styles.mapview}
            ref={ref => this.mapview = ref}
            provider={PROVIDER_GOOGLE}
            region={userRegion}
            showsMyLocationButton={false}
            showsCompass={false}
            showsBuildings={false}
            minZoomLevel={6}
            maxZoomLevel={16}
            customMapStyle={require("@assets/mapstyle.json")}
          >

            { this.state.userLocation && 
                <UserMapMarker coordinate={userRegion}
                               title="Você"/> }

            { getDirection() }

          </MapView>
        }

        <GooglePlacesSearch onSelectLocation={this.onSelectLocation.bind(this)} />

        <DirectionInfoBox
          ref={ref => this.DirectionInfoBox = ref}
          directionResult={this.state.directionResult}
          onSelectTransport={
            transportMode => this.setState({ transportMode })
          }
        />

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
