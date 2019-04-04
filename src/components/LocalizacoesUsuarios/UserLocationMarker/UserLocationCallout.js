import React, { Component } from 'react';
import {
  Image,              // Renders images
  StyleSheet,         // CSS-like styles
  View,               // Container component
} from 'react-native';

import {
  Text
} from 'react-native-paper'

import { Callout } from 'react-native-maps'

import fonts from "@/resources/fonts"
import colors from "@/resources/colors"

import { Line } from '@/components/Forms'

import FAIcon from 'react-native-vector-icons/FontAwesome5'

export default class UserLocationCallout extends Component {

  render() {
    return (
      <Callout style={styles.calloutContainer}>
        <View style={styles.container}>
          <Text style={styles.username}>Gustavo Carvalho</Text>
          <Line />
          <View style={styles.infoContainer}>
            <View style={styles.textInfoContainer}>
              <Text style={styles.infoTextLabel}>Distância</Text>
              <Text style={[styles.infoText, {
                // fontSize: distance > 1000 ? 30 : 40
              }]}>
                100M
              </Text>
            </View>
            <View style={styles.textInfoContainer}>
              <Text style={styles.infoTextLabel}>Tempo estimado</Text>
              <Text style={[styles.infoText, {
                // fontSize: distance > 1000 ? 30 : 40
              }]}>
                10h50
              </Text>
            </View>
          </View>
          <View style={styles.bottomBoxLine}></View>
        </View>
          <FAIcon
            name={"car"}
            size={23}
            color={"#cacaca"}
            style={styles.transportModeIndicator}
          />
      </Callout>
    );
  }
}

const styles = StyleSheet.create({
  calloutContainer: {
    width: 250,
    height: 150,
    padding: 15
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  username: {
    fontSize: 15,
    color: colors.primaryDark,
    fontFamily: fonts.primaryBold
  },
  // INFO CONTAINER
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInfoContainer: {
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  infoTextLabel: {
    color: '#C5C5C5'
  },
  infoText: {
    color: colors.primaryColor,
    fontSize: 25
  },
  bottomBoxLine: {
    width: '60%',
    height: 5,
    backgroundColor: '#F1F1F1',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 10,
    bottom: 0
  },
  transportModeIndicator: {
    position: 'absolute',
    bottom: 11,
    right: 10,
  }
});