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

import {
  Button
} from '@/components/Forms'

import fonts from '@/resources/fonts'
import colors from '@/resources/colors'

export default class PendingEventBottomSheet extends Component {

  open(eventID) {
    this.EventSheet.open()
  }


  onNext(){

  }

  onRecuse(){
    this.EventSheet.close();
    // Snackbar.show({
    //   title: 'Convite Recusado',
    //   duration: Snackbar.LENGTH_LONG,
    //   action: {
    //     title: 'Desfazer',
    //     color: '#fff',
    //     onPress: () => { /* Do something. */ },
    //   },
    // })
  }

  render() {
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
          <Image source={require('@assets/images/event-test-image.jpg')}
            style={styles.eventImage} />
          <View style={styles.inviteNumberContainer}>
            <Text style={styles.inviteTitle}>Convites</Text>
            <Text style={styles.inviteNumber}>50</Text>
          </View>
          <View style={styles.inviteNumberContainer}>
            <Text style={styles.inviteTitle}>Aceitos</Text>
            <Text style={styles.inviteNumber}>35</Text>
          </View>
          <View style={styles.inviteNumberContainer}>
            <Text style={styles.inviteTitle}>Recusados</Text>
            <Text style={styles.inviteNumber}>15</Text>
          </View>
        </View>

        <View style={styles.eventInfo}>
          <Text style={styles.eventTitle}>Nome do Evento</Text>
          <Text style={styles.eventDescription}>Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Nulla dolor libero, fermentum in viverra et, 
            tempus sit amet quam. Curabitur sit amet accumsan
            neque. Morbi imperdiet eget arcu a dictum. Sed quis 
            ultricies justo, a euismod felis
          </Text>
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
                  fontSize: 10
                }}>Recusar</Button>
          <Button color='#47C1CF'
                rounded
                mode="outlined"
                small
                icon="keyboard-arrow-right"
                style={{ borderColor: "#47C1CF", fontSize: 10 }}>Próximo</Button>
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
    borderColor: "#F6F6F6"
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
    flexDirection: 'row',
    marginTop: 15
  }
})
