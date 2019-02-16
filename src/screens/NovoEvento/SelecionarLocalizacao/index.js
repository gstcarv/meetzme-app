import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  AsyncStorage,
  ActivityIndicator
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
import FitFloatButton from '@/components/Maps/FitFloatButton';
import CenterLocationFloatButton from '@/components/Maps/CenterLocationFloatButton';
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
      centerLocationHidden: true
    }
  }

  async componentDidMount() {

    this.centerLocationHidden = true

    const { navigation } = this.props

    setTimeout(() => {
      this.setState({
        loading: false
      })
    }, 500)

    const userLastLocation = await AsyncStorage.getItem("USER_LAST_LOCATION");
    if (userLastLocation) {
      this.setState({
        userLocation: JSON.parse(userLastLocation),
      })
    }

    navigator.geolocation.getCurrentPosition(
      async pos => {
        if (!this.isUnmounted) {
          this.setState({
            userLocation: pos.coords,
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
        left: 60,
        right: 60,
        top: 125,
        bottom: 850
      }
    })

    this.DirectionInfoBox.show();
    this.searchField.hide();
  }

  onDirectionError() {
    Snackbar.show({
      title: 'Não foi possível traçar a rota',
      duration: Snackbar.LENGTH_LONG,
      backgroundColor: '#b71b25'
    })
  }

  onCloseDirectionBox() {
    this.setState({
      destination: null
    })

    this.DirectionInfoBox.hide();
    this.searchField.show();
  }

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

  _onPressCenterLocation() {
    this.mapview.animateCamera({
      center: this.state.userLocation,
      pitch: 30,
      zoom: 15,
    })
    this.CenterLocationFloatButton.hide()
    setTimeout(() => {
      this.centerLocationHidden = true
    }, 1000)
  }

  _onRegionChange() {
    if (this.centerLocationHidden == true) {
      this.CenterLocationFloatButton.show()
      this.centerLocationHidden = false
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
              onReady={this.onDirectionReady.bind(this)}
              onError={this.onDirectionError.bind(this)}
            />
            <DestinationMapMarker
              coordinate={this.state.destination}
            />
          </View>
        )
      }
    }

    if (this.state.loading == false) {
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
            maxZoomLevel={16.7}
            rotateEnabled={false}
            moveOnMarkerPress={false}
            customMapStyle={require("@assets/mapstyle.json")}
            onRegionChange={this._onRegionChange.bind(this)}
          >

            {this.state.userLocation &&
              <UserMapMarker coordinate={userRegion}
                title="Você" />}

            <UserMapMarker coordinate={userRegion}
              title="Você" />

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

          <CenterLocationFloatButton
            onPress={this._onPressCenterLocation.bind(this)}
            ref={ref => this.CenterLocationFloatButton = ref}
          />

          <BackButton color={colors.primaryColor} />

        </View>
      )
    } else {
      return (
        <View style={styles.loadingContainer}>
          <BackButton color={colors.primaryColor} />
          <ActivityIndicator
            size="large"
            color={colors.primaryColor}
          />
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mapview: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default withNavigation(SelecionarLocalizacao)