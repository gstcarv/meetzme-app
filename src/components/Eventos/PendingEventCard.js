import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

import fonts from '@/resources/fonts'
import colors from '@/resources/colors'

export default class PendingEventCard extends Component {
  render() {

    const {
      date,
      title
    } = this.props;

    const eventDateTime = new Date(date);
    let eventDate = eventDateTime.toLocaleDateString();

    return (
      <View style={styles.cardContainer}>
        <Text style={[styles.eventText, styles.eventDate]}>{eventDate}</Text>
        <Text style={[styles.eventText, styles.eventTitle]}>{title}</Text>
      </View>
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
    marginTop: 4,
  }
})
