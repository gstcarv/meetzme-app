import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  AsyncStorage,
} from 'react-native'

import {
  withNavigation
} from 'react-navigation'

import BackButton from '@/components/BackButton'

import Snackbar from 'react-native-snackbar'

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

import GooglePlacesSearch from '@/components/NovoEvento/GooglePlacesSearch'
import MapDirections from '@/components/NovoEvento/MapDirections'

import colors from '@/resources/colors'
import DirectionInfoBox from '@/components/Maps/DirectionInfoBox';
import UserMapMarker from '@/components/Maps/UserMapMarker';
import DestinationMapMarker from '@/components/Maps/DestinationMapMarker';

class SelecionarLocalizacao extends Component {

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
      directionResult: {
        distance: 0,
        duration: 0
      },
      lastLocation: null
    }
  }

  async componentDidMount() {
    this.loading = true;

    const { navigation } = this.props 

    this.navigationFocusSub = navigation.addListener("didFocus", () => {
      let eventProps = navigation.getParam('infoEvento')
      if(eventProps.destination){
        this.setState({
          destination: eventProps.destination
        })
      }
    })

    const userLastLocation = await AsyncStorage.getItem("USER_LAST_LOCATION");
    if (userLastLocation) {
      this.setState({
        userLocation: JSON.parse(userLastLocation),
        loading: false
      })
    }

    this.positionSubscription = navigator.geolocation.getCurrentPosition(
      async pos => {
        if (!this.isUnmounted) {
          this.setState({
            userLocation: pos.coords,
            loading: false
          })
          await AsyncStorage.setItem("USER_LAST_LOCATION", JSON.stringify(pos.coords));
        }
      },
      async err => {
        if (!this.isUnmounted) {
          Snackbar.show({
            title: 'Ocorreu um erro ao determinar sua localização atual',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: '#b71b25'
          })
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
    )
  }

  componentWillUnmount() {
    this.isUnmounted = true;
    this.navigationFocusSub.remove()
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
        top: 30,
        bottom: 600
      }
    })

    this.DirectionInfoBox.show();
    this.searchField.hide();
  }

  onCloseDirectionBox() {
    this.setState({
      destination: null
    })

    this.DirectionInfoBox.hide();
    this.searchField.show();

  }

  component

  selecionarConvidados() {
    if (this.state.destination) {
      const { navigation } = this.props;
      let info = navigation.getParam('infoEvento')
      navigation.navigate('SelecionarConvidados', {
        ...info,
        destination: this.state.destination,
        transport: this.state.transportMode
      })
    }
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

        <MapView style={styles.mapview}
          ref={ref => this.mapview = ref}
          provider={PROVIDER_GOOGLE}
          region={userRegion}
          initialRegion={this.state.userLastLocation || null}
          showsMyLocationButton={false}
          showsCompass={false}
          showsBuildings={false}
          minZoomLevel={6}
          maxZoomLevel={16}
          rotateEnabled={false}
          moveOnMarkerPress={false}
          customMapStyle={require("@assets/mapstyle.json")}
        >

          {this.state.userLocation &&
            <UserMapMarker coordinate={userRegion}
              title="Você" />}

          {getDirection()}

        </MapView>

        <GooglePlacesSearch onSelectLocation={this.onSelectLocation.bind(this)}
          ref={ref => this.searchField = ref} />

        <DirectionInfoBox
          ref={ref => this.DirectionInfoBox = ref}
          directionResult={this.state.directionResult}
          onClose={() => this.onCloseDirectionBox()}
          canReturn={true}
          onNext={() => this.selecionarConvidados()}
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

export default withNavigation(SelecionarLocalizacao)