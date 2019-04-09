import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  View,
} from 'react-native';

import {
  Text
} from 'react-native-paper'

import { Callout } from 'react-native-maps'

import fonts from "@/resources/fonts"
import colors from "@/resources/colors"

import { Line } from '@/components/Forms'

import FAIcon from 'react-native-vector-icons/FontAwesome5'

import strings from '@/resources/strings'

import moment from 'moment'

export default class UserLocationCallout extends Component {

  constructor(props){
    super()
    this.state = {
      distance: "...",
      duration: "..."
    }

    this.icons = {
      driving: "car",
      transit: "bus",
      bicycling: "bicycle",
      walking: "walking"
    }

  }

  componentDidMount(){
    this.mapClient = require('react-native-google-maps-services').createClient({
      key: strings.GoogleMapsKey
    });
    this.updateInfo(this.props.coordinate)
  }

  updateInfo(coordinates){
    const {
      destination,
      transportMode
    } = this.props;

    this.mapClient.distanceMatrix({
      origins: [
        coordinates
      ],
      destinations: [
        destination
      ],
      mode: transportMode.toLowerCase()
    }, (err, { json }) => {

      const {
        distance,
        duration
      } = json.rows[0].elements[0]

      const formattedDistance = distance.text.replace(" ", "").toUpperCase();

      var formattedDuration = "";

      if(duration.value >= 3600){
        formattedDuration = moment.utc(duration.value * 1000).format('HH:mm');
        formattedDuration.toString().replace(":", "H")
      } else {
        formattedDuration = moment.utc(duration.value * 1000).format('mm');
        formattedDuration.toUpperCase()
      }

      this.setState({
        distance: formattedDistance,
        duration: formattedDuration
      })

      this.props.renderAgain()

    })
  }

  render() {

    const { distance, duration } = this.state;

    return (
      <Callout style={styles.calloutContainer}>
        <View style={styles.container}>
          <Text style={styles.username}>{this.props.title}</Text>
          <Line />
          <View style={styles.infoContainer}>
            <View style={styles.textInfoContainer}>
              <Text style={styles.infoTextLabel}>Distância</Text>
              <Text style={styles.infoText}>
                { distance }
              </Text>
            </View>
            <View style={styles.textInfoContainer}>
              <Text style={styles.infoTextLabel}>Tempo estimado</Text>
              <Text style={styles.infoText}>
                { duration }
              </Text>
            </View>
          </View>
          <View style={styles.bottomBoxLine}></View>
        </View>
          <FAIcon
            name={this.icons[this.props.transportMode]}
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