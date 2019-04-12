import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import {
  Text,
  TouchableRipple
} from 'react-native-paper'

import colors from '@/resources/colors'

import FAIcon from 'react-native-vector-icons/FontAwesome5'

export default class ProfileDataRow extends Component {
  render() {
    return (
      <TouchableRipple onPress={() => {
        if (this.props.onPress)
          this.props.onPress()
      }}
        style={styles.touchable}>
        <View style={styles.container}>
          <View>
            <FAIcon
              name={this.props.icon}
              size={20}
              color={colors.primaryColor}
            />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{this.props.title}</Text>
            <Text style={styles.content}>{this.props.content}</Text>
          </View>
          {
            this.props.editable &&
            <FAIcon
              name="pen"
              size={18}
              color="#bbb"
              style={{ padding: 15 }}
            />
          }
        </View>
      </TouchableRipple>
    )
  }
}

const styles = StyleSheet.create({
  touchable: {
    borderBottomColor: "#eee",
    borderBottomWidth: 1
  },
  container: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  infoContainer: {
    marginLeft: 24,
    flex: 1,
  },
  title: {
    fontSize: 15,
    color: "#cacaca"
  },
  content: {
    fontSize: 20
  }
})
