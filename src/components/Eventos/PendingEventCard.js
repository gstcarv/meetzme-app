import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

import fonts from '@/resources/fonts'
import colors from '@/resources/colors'

import TouchableScale from 'react-native-touchable-scale'

export default class PendingEventCard extends Component {
  render() {

    const {
      datetime,
      title
    } = this.props.eventData;

    const eventDateTime = new Date(datetime);
    let eventDate = eventDateTime.toLocaleDateString();

    return (
      <TouchableScale style={styles.cardContainer}
          onPress={this.props.onPress}>
        <Text style={[styles.eventText, styles.eventDate]}>{eventDate}</Text>
        <Text style={[styles.eventText, styles.eventTitle]}>{title}</Text>
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
    marginTop: 4,
  }
})
