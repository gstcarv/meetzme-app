import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import {
  TouchableRipple
} from 'react-native-paper'

import fonts from '@/resources/fonts'

export default class SearchListRow extends Component {  
  render() {

    const { terms } = this.props.item;

    return (
      <TouchableRipple style={styles.localContainer}>
        <View>
          <Text style={styles.localTitle}>{terms[0].value} </Text>
          <View style={styles.detailsContainer}>
            {

              terms.map((term, index) => {
                if (index != 0) {
                  if (index == terms.length - 1) {
                    return <Text style={styles.localDescription}>{term.value}</Text>
                  } else {
                    return <Text style={styles.localDescription}>{term.value} - </Text>
                  }
                }
              })

            }
          </View>
        </View>
      </TouchableRipple>
    )
  }
}

const styles = StyleSheet.create({
  localContainer: {
    height: 50,
    flex: 1,
    justifyContent: 'center'
  },
  detailsContainer: {
    flexDirection: 'row'
  },
  localTitle: {
    fontFamily: fonts.primary,
    fontSize: 15
  },
  localDescription: {
    fontFamily: fonts.primary,
    color: "#ddd"
  }
})
