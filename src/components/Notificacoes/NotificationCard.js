import React, { Component } from 'react'
import { StyleSheet, View, Image } from 'react-native'

import {
  TouchableRipple,
  IconButton,
  Text
} from 'react-native-paper'

import moment from 'moment'

import fonts from '@/resources/fonts'
import colors from '@/resources/colors'

export default class NotificationCard extends Component {
  render() {

    const {
      title,
      description,
      date
    } = this.props;

    let formattedDate = moment(date).format("DD/MM/YYYY H:mm")
    formattedDate = formattedDate.replace(":", "h")

    return (
      <TouchableRipple style={styles.touchableContainer}
        onPress={() => { }}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.notificationImage}
              source={require('@assets/images/event-test-image.jpg')}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.date}>{formattedDate}</Text>
          </View>
        </View>
      </TouchableRipple>
    )
  }
}

const styles = StyleSheet.create({
  touchableContainer: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 7,
    padding: 17,
    marginBottom: 15
  },
  container: {
    flexDirection: 'row'
  },
  notificationImage: {
    width: 55,
    height: 55,
    borderRadius: 60
  },
  imageContainer: {
    marginRight: 17
  },
  textContainer: {
    flex: 1
  },
  title: {
    fontSize: 17,
    fontFamily: fonts.primaryBold,
    color: colors.primaryDark,
    marginBottom: 6
  },
  description: {
    color: "#aaa"
  },
  date: {
    fontSize: 12,
    alignSelf: 'flex-end',
    marginTop: 5,
    color: "#bbb"
  }
})
