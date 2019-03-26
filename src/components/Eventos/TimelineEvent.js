import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View
} from 'react-native'

import { Avatar } from 'react-native-paper';

import TouchableScale from 'react-native-touchable-scale'
import FAIcon from 'react-native-vector-icons/FontAwesome5'

import fonts from '@/resources/fonts'
import colors from '@/resources/colors'

import moment from 'moment'

import LoggedUserStore from '@/store/LoggedUserStore'

export default class TimelineEvent extends Component {
  render() {

    const {
      id,
      title,
      locationName,
      datetime,
      imageURL,
      adminID
    } = this.props.eventData;
    
    const eventDateTime = new Date(datetime);
    const formattedDate = moment(eventDateTime).format("DD/MM/YYYY");
    eventTime = eventDateTime.toLocaleTimeString();

    var formattedTime = moment(eventDateTime).format("H:mm").replace(':', 'h');

    const isAdmin = LoggedUserStore.get().uid == adminID;

    return (
      <View style={styles.container}>
        <View style={styles.timelineTextContainer}>
          <Text style={[styles.dateText]}>
            {formattedDate}
          </Text>
          <Text style={[styles.timeText]}>
            {formattedTime}
          </Text>
        </View>
        <View style={styles.timelineLine}>
          <View style={styles.timelineMarker}></View>
        </View>
        <TouchableScale
          style={styles.timelineCard}
          onPress={() => this.props.onPress(id)}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.eventTitle}>{title}</Text>
            <Avatar.Image
              size={24}
              source={{ uri: imageURL }}
            />
          </View>
          <View style={styles.localContainer}>
            <Text style={styles.localText}>
              {locationName}
            </Text>
          </View>

          {
            isAdmin ? (
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  localContainer: {
    flexDirection: 'row',
    marginTop: 7
  },
  eventTitle: {
    fontFamily: fonts.primary,
    color: '#9B9B9B',
    fontSize: 17,
    width: "90%"
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
  }
})
