import React, { Component } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'
import moment from 'moment'

import fonts from '@/resources/fonts'
import colors from '@/resources/colors'

import TouchableScale from 'react-native-touchable-scale'

export default class PendingEventCard extends Component {
  render() {

    const {
      datetime,
      title,
      imageURL
    } = this.props.eventData;

    let eventDate = moment(new Date(datetime)).format('DD/MM/YYYY'),
      eventTime = moment(new Date(datetime)).format('HH:mm')
    
    eventTime = eventTime.replace(':', 'h')

    return (
      <TouchableScale style={styles.cardContainer}
          onPress={this.props.onPress}>
        <Text style={[styles.eventText, styles.eventDate]}>{eventDate}</Text>
        <Text style={[styles.eventText, styles.eventTitle]}>{title}</Text>
        <Image 
          source={{
            uri: imageURL
          }}
          style={styles.eventImage}
        />
        <Text style={[styles.eventText, styles.eventDate]}>{eventTime}</Text>
      </TouchableScale>
    )
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    elevation: 2,
    backgroundColor: "#fff",
    margin: 3,
    padding: 15,
    flexGrow: 1,
    alignSelf: 'flex-start',
    borderRadius: 3
  },
  eventText: {
    fontFamily: fonts.primaryBold
  },
  eventDate: {
    color: colors.primaryColor
  },
  eventTitle: {
    color: '#AAA',
    marginLeft: 6,
    fontSize: 15,
    marginVertical: 4,
  },
  eventImage: {
    width: 20,
    height: 20,
    position: 'absolute',
    borderRadius: 50,
    right: 10,
    top: 10,
    backgroundColor: "#f6f6f6"
  }
})
