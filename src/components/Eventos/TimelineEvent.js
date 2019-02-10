import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

import TouchableScale from 'react-native-touchable-scale'

import fonts from '@/resources/fonts'

import FAIcon from 'react-native-vector-icons/FontAwesome5'

import colors from '@/resources/colors'

export default class TimelineEvent extends Component {
  render() {

    const {
      date,
      title,
      local
    } = this.props;

    const eventDateTime = new Date(date);
    let eventDate = eventDateTime.toLocaleDateString(),
      eventTime = eventDateTime.toLocaleTimeString();

    var eventTimeFormat = eventTime.split(":");
    eventTimeFormat.pop();
    eventTimeFormat = eventTimeFormat.join(":").replace(":", "h")
    eventTime = eventTimeFormat;

    return (
      <View style={styles.container}>
        <View style={styles.timelineTextContainer}>
          <Text style={[styles.dateText]}>
            {eventDate}
          </Text>
          <Text style={[styles.timeText]}>
            {eventTime}
          </Text>
        </View>
        <View style={styles.timelineLine}>
          <View style={styles.timelineMarker}></View>
        </View>
        <TouchableScale style={styles.timelineCard}>
          <Text style={styles.eventTitle}>{title}</Text>
          <View style={styles.localContainer}>
            <FAIcon name="map-marker-alt" size={15} color="#ccc"
                style={{marginRight: 5}}></FAIcon>
            <Text style={styles.localText}>
              { local }
            </Text>
          </View>

          {
              this.props.admin ? (
                <View style={{
                  alignSelf: 'flex-end',
                  marginTop: 7,
                  backgroundColor: colors.primaryColor,
                  padding: 5,
                  borderRadius: 5
                }}>
                  <Text style={{ fontFamily: fonts.primaryBold, color: "#fff", fontSize: 10 }}>ADMIN</Text>
                </View>
              ) : null
          }

        </TouchableScale>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
  },
  timelineTextContainer: {
    justifyContent: 'center'
  },
  timelineLine: {
    height: '100%',
    width: 1,
    backgroundColor: '#ECECEC',
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20
  },
  timelineMarker: {
    width: 15,
    height: 15,
    backgroundColor: '#F9FAFC',
    alignSelf: 'center',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#ECECEC'
  },
  timelineCard: {
    elevation: 2,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 3,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 2,
    minWidth: '40%',
    flex: 1,
    borderColor: colors.primaryColor
  },
  localContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7
  },
  eventTitle: {
    fontFamily: fonts.primary,
    color: '#9B9B9B',
    fontSize: 17
  },
  localText: {
    fontFamily: fonts.primary,
    color: '#ccc'
  },
  dateText: {
    fontFamily: fonts.primaryBold,
    color: '#ccc'
  },
  timeText: {
    fontFamily: fonts.primary,
    color: '#9B9B9B',
    alignSelf: 'flex-end'
  },
})
