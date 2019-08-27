import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  ActivityIndicator,
  StatusBar
} from 'react-native'

import {
  CoordinatorLayout,
} from 'react-native-bottom-sheet-behavior'

import MapBottomSheet from '@/components/LocalizacoesUsuarios/MapBottomSheet'

import firebase from 'react-native-firebase'

import { withNavigation } from 'react-navigation'

import AppMapView from '@/components/Maps/AppMapView'
import UserLocationMarker from '@/components/LocalizacoesUsuarios/UserLocationMarker'
import DestinationMapMarker from '@/components/Maps/DestinationMapMarker'
import TogglableFloatButton from '@/components/LocalizacoesUsuarios/TogglableFloatButton'

import colors from '@/resources/colors'

import { inject } from 'mobx-react/native'
import { toJS } from 'mobx'

import LoggedUserStore from '@/store/LoggedUserStore'

import { LocationListener } from '@/modules'

import { Snackbar } from 'react-native-paper'

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
      participants: [],
      snackbar: {
        visible: false,
        message: "HelloWorld"
      }
    }
  }

  componentWillMount() {
    this.mapMarkers = []
  }

  fitAllMarkers() {
    if(this.mapview.map){
      this.mapview.map.fitToElements(true, {
        bottom: 400
      })
    }
  }

  centerUserMarker() {
    try {
      const { lastLocation } = toJS(LoggedUserStore);

      this.mapview.map.animateCamera({
        center: lastLocation,
        pitch: 30,
        zoom: 15,
      })
    } catch {
      LoggedUserStore.getAndSendLocation()
    }
  }

  _onBottomSheetStateChanged(state) {
    if (state == 4) {
      // Mostra os Floating Action Buttons
      this.FABCenterCamera.show()
      this.FABSeeAllMarkers.show(200)
    } else if (state == 2) {
      // Esconde os Floating Action Buttons
      this.FABCenterCamera.hide(200)
      this.FABSeeAllMarkers.hide(0)
    }
  }

  watchEventActions(eventID) {
    firebase.firestore()
      .collection('events')
      .doc(eventID)
      .onSnapshot(async snap => {
        const oldParticipants = this.state.infoEvento.participants,
          newParticipants = snap.data().participants;

        for (let userID in newParticipants) {
          let inviteState = newParticipants[userID];
          if (inviteState != oldParticipants[userID]) {
            if (inviteState == true) {
              const { EventsStore } = this.props;

              let participantData = await EventsStore.getParticipantData(userID, this.eventID);

              this.setState({
                participants: [
                  ...this.state.participants,
                  participantData
                ]
              })

              this.watchParticipant(participantData)

              this.showSnackbar(participantData.name + " aceitou o convite!");
            }
          }
        }

      })
  }

  watchParticipant(participant) {
    usersRef = firebase.firestore().collection('users');
    let watch = usersRef
      .doc(participant.uid)
      .onSnapshot(snap => {

        const {
          latitude,
          longitude
        } = snap.data().lastLocation

        if (this.mapMarkers[snap.id]) {
          this.mapMarkers[snap.id].update({
            latitude,
            longitude
          })
        }
      })
  }

  async componentDidMount() {
    this.watchLocations = []

    // Pega a ID do Evento
    const eventID = this.props.navigation.getParam('eventID');

    this.eventID = eventID;

    // Inicia o Service de Localizaçãp
    LocationListener.startService()

    // Pega as Informações do Evento
    const { EventsStore } = this.props;

    await EventsStore.refreshEventData(eventID);

    infoEvento = toJS(EventsStore.acceptedEvents).find(event => event.id == eventID)
    this.setState({ infoEvento })

    this.watchEventActions(eventID);

    // Pega os Participantes do Evento
    let participants = await EventsStore.getEventParticipants(eventID)

    // Mostra os Float Action Buttons
    this.FABCenterCamera.show(600)
    this.FABSeeAllMarkers.show(1000)

    // Pega em Tempo Real a Localização de cada participante
    participants.forEach(async participant => {
      this.watchParticipant(participant)
    })

    this.setState({ participants })

    setTimeout(() => {
      this.setState({
        loading: false
      })
    }, 500)

    setTimeout(() => {
      this.fitAllMarkers();
    }, 2000)

  }

  showSnackbar(message){
    this.setState({
      snackbar: {
        message,
        visible: true
      }
    })
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
                      destination={destination}
                      title={user.uid == uid ? "Você" : user.name}
                      isOtherUser={user.uid != uid}
                      image={user.photoURL}
                      key={user.uid}
                      transportMode={user.transportMode}
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
                description={locationName.split('-')[1]}
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
        <View style={{
          position: 'absolute',
          width: '100%',
          height: 70,
          top: 0
        }}>
          <Snackbar
            visible={this.state.snackbar.visible}
            onDismiss={() => this.setState({ snackbar: { visible: false } })}
          >
            {this.state.snackbar.message}
          </Snackbar>

        </View>
        
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
  },
  snackbarStyle: {

  }
})
