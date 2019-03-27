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
import TogglableFloatButton from '@/components/LocalizacoesUsuarios/TogglableFloatButton'

import BackButton from '@/components/BackButton'
import colors from '@/resources/colors'
import fonts from '@/resources/fonts'

import { inject, observer } from 'mobx-react/native'
import { toJS } from 'mobx'

import LoggedUserStore from '@/store/LoggedUserStore'

import { LocationListener } from '@/modules'
import { MapView, Polyline } from 'react-native-maps';

import {
  Text,
  FAB
} from 'react-native-paper'

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

  componentWillMount() {
    this.mapMarkers = []
  }

  fitAllMarkers() {
    this.mapview.map.fitToElements(true)
  }

  centerUserMarker() {
    const { lastLocation } = LoggedUserStore;

    this.mapview.map.animateCamera({
      center: this.state.userLocation,
      pitch: 30,
      zoom: 15,
    })
  }

  _onBottomSheetStateChanged(state) {
    if (state == 4) {
      this.FABCenterCamera.show()
      this.FABSeeAllMarkers.show(200)
    } else if (state == 2) {
      this.FABCenterCamera.hide(200)
      this.FABSeeAllMarkers.hide(0)
    }
  }

  async componentDidMount() {
    this.watchLocations = []

    // Pega a ID do Evento
    const eventID = this.props.navigation.getParam('eventID') || "LnY6MUHa2bsbx03TlrLI";

    // Inicia o Service de Localizaçãp
    LocationListener.startService()

    // Pega as Informações do Evento
    const { EventsStore } = this.props;
    let infoEvento = toJS(EventsStore.acceptedEvents).find(event => event.id == eventID)
    this.setState({ infoEvento })

    // Pega os Participantes do Evento
    let participants = await EventsStore.getEventParticipants(eventID)

    // Mostra os Float Action Buttons
    this.FABCenterCamera.show(600)
    this.FABSeeAllMarkers.show(1000)

    // Pega em Tempo Real a Localização de cada participante
    const usersRef = firebase.firestore().collection('users');
    participants.forEach(participant => {
      let watch = usersRef
        .doc(participant.uid)
        .onSnapshot(snap => {

          const {
            latitude,
            longitude
          } = snap.data().lastLocation

          let newLocations = this.state.participants.map(p => {
            if (p.uid == snap.id) {
              p.lastLocation = snap.data().lastLocation
            }
            return p;
          })

          if (this.mapMarkers[snap.id]) {
            this.mapMarkers[snap.id].markerRef.animateMarkerToCoordinate({
              latitude,
              longitude,
              duration: 1000
            })
          }
          // this.setState({ participants: newLocations });
        })
    })

    this.setState({ participants })

    setTimeout(() => {
      this.setState({
        loading: false
      })
    }, 500)
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
            moveOnMarkerPress={true}
            ref={ref => this.mapview = ref}
            onPositionLoaded={(userLocation) => this.setState({ userLocation })}>

            {
              this.state.participants.map(user => {
                return (
                  <View>
                    <UserLocationMarker
                      coordinate={user.lastLocation}
                      title={user.uid == uid ? "Você" : user.name.split(" ")[0]}
                      isOtherUser={user.uid != uid}
                      image={user.photoURL}
                      key={user.uid}
                      ref={
                        ref => this.mapMarkers[user.uid] = ref
                      }
                    />
                  </View>
                )
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
      <View style={{ flex: 1 }}>
        <CoordinatorLayout style={{ flex: 1 }}>
          {getMap()}
          <MapBottomSheet
            eventData={{ info: infoEvento, participants }}
            onStateChange={this._onBottomSheetStateChanged.bind(this)}
          />
        </CoordinatorLayout>
        <TogglableFloatButton
          icon="gps-fixed"
          onPress={this.centerUserMarker.bind(this)}
          bottom={80}
          ref={
            ref => this.FABCenterCamera = ref
          }
        />
        <TogglableFloatButton
          icon="people"
          onPress={this.fitAllMarkers.bind(this)}
          bottom={150}
          ref={
            ref => this.FABSeeAllMarkers = ref
          }
        />
      </View>

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
