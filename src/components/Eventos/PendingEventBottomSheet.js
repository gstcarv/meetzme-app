import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View,
  Image,
  Alert
} from 'react-native'

import Snackbar from 'react-native-snackbar'

import BottomSheet from "react-native-raw-bottom-sheet";

import EventsStore from '@/store/EventsStore'

import { toJS } from 'mobx'

import {
  Button
} from '@/components/Forms'

import fonts from '@/resources/fonts'
import colors from '@/resources/colors'

export default class PendingEventBottomSheet extends Component {

  constructor(){
    super()
    this.state = {
      eventData: {},
      pending: 0,
      accepted: 0,
      recused: 0
    }
  }

  open(eventID) {
    let eventData = EventsStore.pendingEvents.find(({ id }) => id == eventID)

    let accepted = 0, 
    pending = 0, 
    recused = 0;

    const invites = eventData.participants;
    for(let invitedUser in invites){
      let inviteState = invites[invitedUser];
      if(inviteState == true){
        accepted++
      } else if (inviteState == false){
        recused++
      } else if (inviteState == null){
        pending++
      }
    }

    this.setState({ 
      eventData,
      accepted,
      pending,
      recused
    })

    this.EventSheet.open()
  }

  onRecuse(){
    Alert.alert(
      "Recursar evento",
      "Deseja realmente recusar esse convite?",
      [
        {
          text: "Não"
        },
        {
          text: 'Sim', onPress: () => {
            this.props.onRecuse(this.state.eventData);
            this.EventSheet.close();
          }
        },
      ],
    )
  }

  render() {

    const { title, description, imageURL } = this.state.eventData

    return (
      <BottomSheet
        ref={ref => {
          this.EventSheet = ref;
        }}
        height={350}
        duration={300}
        customStyles={{
          container: {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            paddingHorizontal: 20
          }
        }}
      >
        <View style={styles.topSheetLine} />

        <View style={styles.sheetHeadContainer}>
          <Image source={{uri: imageURL}}
            style={styles.eventImage} />
          <View style={styles.inviteNumberContainer}>
            <Text style={styles.inviteTitle}>Pendentes</Text>
            <Text style={styles.inviteNumber}>{this.state.pending}</Text>
          </View>
          <View style={styles.inviteNumberContainer}>
            <Text style={styles.inviteTitle}>Aceitos</Text>
            <Text style={styles.inviteNumber}>{this.state.accepted}</Text>
          </View>
          <View style={styles.inviteNumberContainer}>
            <Text style={styles.inviteTitle}>Recusados</Text>
            <Text style={styles.inviteNumber}>{this.state.recused}</Text>
          </View>
        </View>

        <View style={styles.eventInfo}>
          <Text style={styles.eventTitle}>{title}</Text>
          <Text style={styles.eventDescription}>{description}</Text>
        </View>
        
        <View style={styles.buttonContainer}>
          <Button color='#C57A7A'
                rounded
                mode="outlined"
                small
                onPress={() => this.onRecuse()}
                style={{
                  marginRight: 6,
                  borderColor: '#C57A7A',
                  ...styles.buttonStyle
                }}>Recusar</Button>
          <Button color='#47C1CF'
                rounded
                mode="outlined"
                small
                icon="keyboard-arrow-right"
                onPress={() => {
                  this.EventSheet.close()
                  this.props.onNext(toJS(this.state.eventData))
                }}
                style={{ 
                  borderColor: "#47C1CF", 
                  ...styles.buttonStyle 
                }}>Próximo</Button>
        </View>

      </BottomSheet>
    )
  }
}

const styles = StyleSheet.create({
  topSheetLine: {
    width: '40%',
    height: 8,
    backgroundColor: '#F1F1F1',
    alignSelf: 'center',
    margin: 10,
  },
  sheetHeadContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  eventImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: "#F6F6F6",
    backgroundColor: "#F6F6F6"
  },
  inviteNumberContainer: {
    alignItems: 'center'
  },
  inviteTitle: {
    fontFamily: fonts.primary,
    color: "#C5C5C5",
    fontSize: 15
  },
  inviteNumber: {
    fontFamily: fonts.primary,
    color: colors.primary,
    fontSize: 30
  },
  eventInfo: {
    marginTop: 15
  },
  eventTitle: {
    fontFamily: fonts.primaryBold,
    color: colors.primary,
    fontSize: 18
  },
  eventDescription: {
    fontFamily: fonts.primary,
    color: "#6D6D6D"
  },
  buttonContainer: {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'row',
    marginTop: 15
  },
  buttonStyle: {
    borderWidth: 1,
    fontSize: 10
  }
})
