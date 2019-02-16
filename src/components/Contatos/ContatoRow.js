import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Image
} from 'react-native'

import {
  TouchableRipple,
  IconButton,
  Surface,
  Text
} from 'react-native-paper'

import fonts from '@/resources/fonts'
import colors from '@/resources/colors'

export default class ContatoRow extends Component {

  constructor() {
    super()
  }

  render() {

    const { name, username, profileImage } = this.props.data;

    return (
      <View>
        {
          this.props.isFirstFromChar == true &&
            <View style={styles.alphabeticListIndicator}>
              <Text style={styles.charStyle}>
                {name.charAt(0).toUpperCase()}
              </Text>
            </View>
        }
        <TouchableRipple style={styles.rowContainer}
          onPress={() => {
            if (this.props.onPress) this.props.onPress(this.props.data)
          }}>
          <View style={styles.contactContainer}>
            <Surface style={styles.avatarSurface}>
              <Image source={profileImage}
                style={styles.profileImage}
              />
            </Surface>
            <View style={styles.contactInfoContainer}>
              <Text style={styles.rowTitle}>{name}</Text>
              <Text style={styles.rowSubtitle}>{username}</Text>
            </View>
            <IconButton
              icon={this.props.icon || "more-vert"}
              style={styles.moreButton}
              onPress={() => console.warn('click')}
            />
          </View>
        </TouchableRipple>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  rowContainer: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: "#ECECEC",
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarSurface: {
    borderRadius: 100,
    elevation: 4,
    marginLeft: 10
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "white"
  },
  contactInfoContainer: {
    marginLeft: 15
  },
  rowTitle: {
    fontFamily: fonts.primaryBold,
    color: colors.primaryColor,
    fontSize: 15
  },
  rowSubtitle: {
    color: "#919191"
  },
  moreButton: {
    position: 'absolute',
    right: 0
  },
  alphabeticListIndicator: {
    backgroundColor: '#f2f5f7',
    padding: 10
  },
  charStyle: {
    marginLeft: 15,
    color: "#99A9B3"
  }
})
