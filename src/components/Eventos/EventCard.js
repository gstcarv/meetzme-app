import React, { Component } from 'react'
import {
  View,
  ImageBackground,
  StyleSheet
} from 'react-native'

import fonts from '@/resources/fonts'
import colors from '@/resources/colors'

import SLIcon from 'react-native-vector-icons/SimpleLineIcons'

import {
  Text,
  TouchableRipple
} from 'react-native-paper'

import moment from 'moment'

import TouchableScale from 'react-native-touchable-scale'

import LoggedUserStore from '@/store/LoggedUserStore';
export default class EventCard extends Component {
  render() {

    const {
      id,
      title,
      locationName,
      description,
      datetime,
      imageURL,
      adminID
    } = this.props.eventData;

    const eventDateTime = new Date(datetime),
      eventDay = eventDateTime.getDate(),
      eventYear = eventDateTime.getFullYear();

    let monthName = moment(eventDateTime.getMonth(), 'M').format('MMM').toUpperCase();

    const formattedDate = moment(eventDateTime).format("DD/MM/YYYY");
    eventTime = eventDateTime.toLocaleTimeString();

    var formattedTime = moment(eventDateTime).format("H:mm").replace(':', 'h');

    const isAdmin = LoggedUserStore.get().uid == adminID;


    return (
      <TouchableScale
        style={styles.cardContainer}
        onPress={() => {
          this.props.onPress(id)
        }}
        rippleColor="rgba(0, 0, 0, .32)"
        useForeground={true}
      >
        <View style={{ flex: 1 }}>
          <ImageBackground source={{ uri: imageURL }}
            style={{ flex: 1 }}>
            <View style={styles.overlay}>
              <View style={styles.overlayContent}>
                <SLIcon name="calendar" size={14} color="#fff" />
                <Text style={styles.overlayText}>{formattedDate}</Text>
              </View>
              <View style={styles.overlayContent}>
                <SLIcon name="clock" size={14} color="#fff" />
                <Text style={styles.overlayText}>{formattedTime}</Text>
              </View>
            </View>
          </ImageBackground>
          <View style={styles.contentContainer}>
            <Text style={styles.eventTitle}>{title}</Text>
            <Text style={styles.eventDescription}>{locationName}</Text>

            {
              isAdmin && (
                <View style={styles.adminBadge}>
                  <Text style={{
                    fontFamily: fonts.primaryBold,
                    color: "#fff",
                    fontSize: 10
                  }}>ADMIN</Text>
                </View>
              )
            }

          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.eventDate}>{monthName}</Text>
            <Text style={[styles.eventDate, styles.eventDay]}>{eventDay}</Text>
            <Text style={styles.eventDate}>{eventYear}</Text>
          </View>
        </View>
      </TouchableScale>
    )
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: '#fff',
    elevation: 10,
    padding: 4,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .5)',
    padding: 8,
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  overlayText: {
    color: '#fff',
    marginHorizontal: 5,
    letterSpacing: 3
  },
  overlayContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  contentContainer: {
    padding: 14
  },
  eventTitle: {
    fontFamily: fonts.primaryBold,
    marginBottom: 4,
    fontSize: 22,
    color: '#222'
  },
  eventDescription: {
    color: '#888'
  },
  dateContainer: {
    position: 'absolute',
    top: -10,
    right: -10,
    width: 80,
    height: 80,
    backgroundColor: 'white',
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1
  },
  eventDate: {
    color: '#888',
    letterSpacing: 3
  },
  eventDay: {
    fontFamily: fonts.primaryBold,
    fontSize: 22,
    marginVertical: 1,
    color: '#222'
  },
  adminBadge: {
    alignSelf: 'flex-end',
    marginTop: 3,
    backgroundColor: colors.primaryColor,
    padding: 5,
    borderRadius: 5
  }
})