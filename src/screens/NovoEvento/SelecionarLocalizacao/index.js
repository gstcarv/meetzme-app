import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  StatusBar,
  ActivityIndicator
} from 'react-native'

import {
  withNavigation
} from 'react-navigation'

import BackButton from '@/components/BackButton'

import Snackbar from 'react-native-snackbar'

import AppMapView from '@/components/Maps/AppMapView'
import MapDirections from '@/components/Maps/MapDirections'
import DirectionInfoBox from '@/components/Maps/DirectionInfoBox'
import UserMapMarker from '@/components/Maps/UserMapMarker'
import DestinationMapMarker from '@/components/Maps/DestinationMapMarker'
import FitFloatButton from '@/components/Maps/FitFloatButton'
import CenterLocationFloatButton from '@/components/Maps/CenterLocationFloatButton'

import GooglePlacesSearch from '@/components/NovoEvento/GooglePlacesSearch'

import colors from '@/resources/colors'

class SelecionarLocalizacao extends Component {

  constructor() {
    super();
    this.state = {
      loading: true,
      userLocation: {
        latitude: 0,
        longitude: 0
      },
      destination: null,
      directionResult: {
        distance: 0,
        duration: 0
      },
      locationName: null,
      transportMode: "driving",
      centerLocationHidden: true
    }
  }

  async componentDidMount() {

    this.centerLocationHidden = true

    setTimeout(() => {
      this.setState({
        loading: false
      })
    }, 500)

  }

  onSelectLocation(place) {
    this.setState({
      locationName: `${place.name} - ${place.address}`,
      destination: place.location
    })
  }

  onDirectionReady(result) {
    const { distance, duration, coordinates } = result

    this.setState({
      directionResult: {
        distance,
        duration,
        coordinates
      }
    })

    this.mapview.map.fitToCoordinates(result.coordinates, {
      edgePadding: {
        left: 100,
        right: 100,
        top: 50,
        bottom: 600
      }
    })

    this.FitFloatButton.show();
    this.DirectionInfoBox.show();
    this.searchField.hide();
    this.CenterLocationFloatButton.hide()
    this.centerLocationHidden = true
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
    this.FitFloatButton.hide();
    this.searchField.show();
  }

  selecionarConvidados() {
    if (this.state.destination) {
      const { navigation } = this.props;
      let info = navigation.getParam('infoEvento')
      navigation.navigate('SelecionarConvidados', {
        infoEvento: {
          ...info,
          locationName: this.state.locationName,
          destination: this.state.destination,
          transport: this.state.transportMode
        }
      })
    }
  }

  _onPressCenterLocation() {
    this.mapview.map.animateCamera({
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
    if (this.centerLocationHidden == true
      && this.state.destination == null
      && this.state.userLocation.latitude != 0) {
      this.CenterLocationFloatButton.show()
      this.centerLocationHidden = false
    }
  }

  _onFitButtonPress() {
    this.mapview.map.fitToCoordinates(this.state.directionResult.coordinates, {
      edgePadding: {
        left: 100,
        right: 100,
        top: 50,
        bottom: 600
      }
    })
  }

  _onSelectTransport(transportMode) {
    this.setState({ transportMode })
    this.DirectionInfoBox.enableLoading()
    this.FitFloatButton.hide()
  }

  render() {
    const getDirection = () => {
      if (this.state.destination) {
        return (
          <View>
            <MapDirections origin={this.state.userLocation}
              destination={this.state.destination}
              onReady={this.onDirectionReady.bind(this)}
              onError={this.onDirectionError.bind(this)}
              mode={this.state.transportMode}
              ref={ref => this.directionLine = ref}
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
            backgroundColor="transparent"
            translucent
            barStyle="dark-content" 
          />

          <AppMapView
            ref={ref => this.mapview = ref}
            onRegionChange={this._onRegionChange.bind(this)}
            onPositionLoaded={(userLocation) => this.setState({ userLocation })}>

            {
              this.state.userLocation &&
              <UserMapMarker coordinate={this.state.userLocation}
                title="Você"
              />
            }

            {getDirection()}

          </AppMapView>

          <GooglePlacesSearch onSelectLocation={this.onSelectLocation.bind(this)}
            ref={ref => this.searchField = ref} />

          <DirectionInfoBox
            ref={ref => this.DirectionInfoBox = ref}
            directionResult={this.state.directionResult}
            onClose={() => this.onCloseDirectionBox()}
            onCloseError={() => this.props.navigation.goBack()}
            canReturn={true}
            onNext={() => this.selecionarConvidados()}
            onSelectTransport={this._onSelectTransport.bind(this)}
          />

          <CenterLocationFloatButton
            onPress={this._onPressCenterLocation.bind(this)}
            ref={ref => this.CenterLocationFloatButton = ref}
          />

          <FitFloatButton
            onPress={this._onFitButtonPress.bind(this)}
            ref={ref => this.FitFloatButton = ref}
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
    flex: 1,
  },
  mapview: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DEE3E6'
  }
})

export default withNavigation(SelecionarLocalizacao)