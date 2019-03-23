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
import UserLocationMarker from '@/components/LocalizacoesUsuarios/UserLocationMarker'
import DestinationMapMarker from '@/components/Maps/DestinationMapMarker'

import BackButton from '@/components/BackButton'
import colors from '@/resources/colors'
import fonts from '@/resources/fonts'

import { inject, observer } from 'mobx-react/native'
import { toJS } from 'mobx'

import LoggedUserStore from '@/store/LoggedUserStore'

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
      transportMode: "DRIVING",
      participants: []
    }
  }

  async componentDidMount() {

    const { EventsStore } = this.props;

    let infoEvento = toJS(EventsStore.acceptedEvents).find(event => event.id == "LnY6MUHa2bsbx03TlrLI")
    this.setState({ infoEvento })

    let participants = await EventsStore.getEventParticipants("LnY6MUHa2bsbx03TlrLI")
    this.setState({ participants })

    setTimeout(() => {
      this.setState({
        loading: false
      })
    }, 500)
  }

  onDirectionReady(result) {

  }

  render() {

    const {
      infoEvento,
      participants
    } = this.state;

    const {
      destination,
      locationName
    } = this.state.infoEvento;

    const { uid } = LoggedUserStore.get();

    const getMap = () => {
      if (this.state.loading == false) {
        return (
          <AppMapView
            ref={ref => this.mapview = ref}
            onPositionLoaded={(userLocation) => this.setState({ userLocation })}>

            {
              this.state.participants.map(user => {
                return <UserLocationMarker coordinate={user.lastLocation}
                  title={user.uid == uid ? "Você" : user.name.split(" ")[0]}
                  isOtherUser={user.uid != uid}
                  image={user.photoURL}
                />
              })
            }

            {
              destination &&
              <DestinationMapMarker
                coordinate={destination}
                title={
                  locationName.split('-')[0]
                }
              />
            }

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
        <MapBottomSheet eventData={{ info: infoEvento, participants }} />
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
