import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Dimensions
} from 'react-native'

import {
  CoordinatorLayout,
  MergedAppBarLayout
} from 'react-native-bottom-sheet-behavior'

import MapBottomSheet from '@/components/LocalizacoesUsuarios/MapBottomSheet'

import firebase from 'react-native-firebase'

import { withNavigation } from 'react-navigation'

import AppMapView from '@/components/Maps/AppMapView'
import MapDirections from '@/components/Maps/MapDirections'
import UserMapMarker from '@/components/Maps/UserMapMarker'

import BackButton from '@/components/BackButton'
import colors from '@/resources/colors'
import fonts from '@/resources/fonts'

import { inject, observer } from 'mobx-react/native'

@inject('EventsStore')
class LocalizacoesUsuarios extends Component {

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
    setTimeout(() => {
      this.setState({
        loading: false
      })
    }, 500)
  }

  onDirectionReady(result) {

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

    const getMap = () => {
      if (this.state.loading == false) {
        return (
          <AppMapView
            ref={ref => this.mapview = ref}
            onPositionLoaded={(userLocation) => this.setState({ userLocation })}>

            <UserMapMarker coordinate={this.state.userLocation}
              title="Você"
            />

          </AppMapView>
        )
      } else {
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              size="large"
              color={colors.primaryColor}
              style={styles.loader}
            />
          </View>
        )
      }
    }

    return (
      <CoordinatorLayout style={{ flex: 1 }}>
        {getMap()}
        <MapBottomSheet />
      </CoordinatorLayout>
    )
  }
}

export default withNavigation(LocalizacoesUsuarios)

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loader: {
    marginTop: 200
  }
})
