import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native'

import firebase from 'react-native-firebase'

import { withNavigation } from 'react-navigation'

import AppMapView from '@/components/Maps/AppMapView'
import MapDirections from '@/components/Maps/MapDirections'
import DirectionInfoBox from '@/components/Maps/DirectionInfoBox'
import UserMapMarker from '@/components/Maps/UserMapMarker'
import DestinationMapMarker from '@/components/Maps/DestinationMapMarker'
import FitFloatButton from '@/components/Maps/FitFloatButton'
import CenterLocationFloatButton from '@/components/Maps/CenterLocationFloatButton'

import BackButton from '@/components/BackButton'
import colors from '@/resources/colors'

import { inject, observer } from 'mobx-react/native'

@inject('EventsStore')
class LocalizacaoEventoPendente extends Component {

  constructor() {
    super();
    this.state = {
      loading: true,
      userLocation: {
        latitude: 0,
        longitude: 0
      },
      infoEvento: {},
      directionResult: {},
      transportMode: "DRIVING"
    }
  }

  componentDidMount() {
    this.setState({
      infoEvento: this.props.navigation.getParam('infoEvento')
    })

    this.destination = this.props.navigation.getParam('infoEvento').destination;

    setTimeout(() => {
      this.setState({
        loading: false
      })
    }, 500)
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

    this.DirectionInfoBox.show()

    this.mapview.map.fitToCoordinates(result.coordinates, {
      edgePadding: {
        left: 100,
        right: 100,
        top: 200,
        bottom: 1000
      }
    })

  }

  _onSelectTransport(transportMode) {
    this.setState({ transportMode })
    this.DirectionInfoBox.minimize();
  }

  async _onAcceptEvent() {
    const { transportMode } = this.state;

    await this.props.EventsStore.acceptEvent({
      eventID: this.state.infoEvento.id,
      transportMode
    });
    
    this.props.navigation.navigate('EventosAceitos');
  }

  render() {
    if (this.state.loading == false) {
      return (
        <View style={{ flex: 1 }}>
          <AppMapView
            ref={ref => this.mapview = ref}
            onPositionLoaded={(userLocation) => this.setState({ userLocation })}
          >

            <UserMapMarker coordinate={this.state.userLocation}
              title="Você"
            />

            <MapDirections origin={this.state.userLocation}
              destination={this.destination}
              onReady={this.onDirectionReady.bind(this)}
              mode={this.state.transportMode}
              ref={ref => this.directionLine = ref}
            />

            <DestinationMapMarker
              coordinate={this.destination}
            />

          </AppMapView>

          <DirectionInfoBox
            ref={ref => this.DirectionInfoBox = ref}
            directionResult={this.state.directionResult}
            onNext={this._onAcceptEvent.bind(this)}
            onSelectTransport={this._onSelectTransport.bind(this)}
          />

          <BackButton color={colors.primaryColor} />

        </View >
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

export default withNavigation(LocalizacaoEventoPendente)

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
