import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View,
  Animated,
  Easing,
  TouchableNativeFeedback,
  BackHandler,
  PanResponder,
  YellowBox
} from 'react-native'

import { Button } from "@/components/Forms"

import FAIcon from 'react-native-vector-icons/FontAwesome5'

import fonts from '@/resources/fonts'
import colors from '@/resources/colors'
import TouchableTransportButton from './DirectionInfoBox/TouchableTransportButton';

const heightValue = 260;
const minimizedValue = heightValue - 50;
const initialTranslateValue = heightValue + 10;

export default class DirectionInfoBox extends Component {

  constructor() {
    super();
    this.state = {
      transport: "driving",
      visible: false,
    }

    this.boxTranslate = new Animated.Value(initialTranslateValue);
    this.createPanResponder()
  }

  createPanResponder() {
    this.panResponder = PanResponder.create({
      onPanResponderMove: (e, gestureState) => {
        gestureState.dy < 0 || gestureState.dy > 400
          ? null
          : Animated.event([null, { dy: this.boxTranslate }])(e, gestureState);
      },
      onPanResponderRelease: (e, gestureState) => {
        if (heightValue / 4 - gestureState.dy < 0) {
          this.minimize()
        } else {
          this.show()
        }
      }
    });
  }

  componentWillMount() {
    if (this.props.canReturn == true) {
      BackHandler.addEventListener('hardwareBackPress', () => {
        if (this.state.visible) {
          this.props.onClose()
          return true;
        }
      })
    }
  }

  componentWillUnmount() {
    if (this.props.canReturn == true) {
      BackHandler.removeEventListener('hardwareBackPress')
    }
  }

  minimize() {
    Animated.spring(this.boxTranslate, {
      toValue: minimizedValue,
      duration: 500,
      bounciness: 15,
      useNativeDriver: true
    }).start()
    this.setState({
      visible: false
    })
  }

  enableLoading() {
    Animated.spring(this.boxTranslate, {
      toValue: 150,
      duration: 1000,
      bounciness: 15,
      useNativeDriver: true
    }).start()
  }

  show() {
    Animated.spring(this.boxTranslate, {
      toValue: 0,
      duration: 1000,
      delay: 1000,
      bounciness: 15,
      useNativeDriver: true
    }).start()
    this.setState({
      visible: true
    })
  }

  hide() {
    Animated.timing(this.boxTranslate, {
      toValue: initialTranslateValue,
      duration: 400,
      easing: Easing.ease,
      useNativeDriver: true
    }).start()
    this.setState({
      visible: false
    })
  }

  selectTransport(transport) {

    if (this.state.transport != transport) {
      this.setState({ transport })
      if (this.props.onSelectTransport) {
        this.props.onSelectTransport(transport);
      }
    }
  }

  render() {

    const { transport } = this.state;
    const { distance, duration } = this.props.directionResult;

    let computedDistance = () => {
      if (distance > 0) {
        return distance.toFixed(1) + "KM"
      } else {
        let inMetersDistance = distance * 1000;
        return inMetersDistance.toFixed(0) + "M"
      }
    }

    let computedDuration = () => {
      if (duration <= 60) {
        return duration.toFixed(0) + "MIN"
      } else {
        let hours = duration / 60;
        return hours.toFixed(1) + "H"
      }
    }

    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        style={[styles.container, {
          transform: [
            { translateY: this.boxTranslate }
          ]
        }]}>
        <View style={styles.topBoxLine}></View>
        <View style={styles.selectTransport}>
          <Text style={styles.transportText}>Selecione o meio de transporte</Text>
          <View style={styles.transportContainer}>
            <TouchableTransportButton
              onPress={() => this.selectTransport('driving')}
              active={transport == "driving"}
              iconName="car" />

            <TouchableTransportButton
              onPress={() => this.selectTransport('transit')}
              active={transport == "transit"}
              iconName="bus" />

            <TouchableTransportButton
              onPress={() => this.selectTransport('bicycling')}
              active={transport == "bicycling"}
              iconName="bicycle" />

            <TouchableTransportButton
              onPress={() => this.selectTransport('walking')}
              active={transport == "walking"}
              iconName="walking" />
          </View>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.textInfoContainer}>
            <Text style={styles.infoTextLabel}>Distância</Text>
            <Text style={[styles.infoText, {
              fontSize: distance > 1000 ? 30 : 40
            }]}>
              {computedDistance()}
            </Text>
          </View>
          <View style={styles.textInfoContainer}>
            <Text style={styles.infoTextLabel}>Tempo estimado</Text>
            <Text style={[styles.infoText, {
              fontSize: distance > 1000 ? 30 : 40
            }]}>
              {computedDuration()}
            </Text>
          </View>
        </View>

        <Button color='#47C1CF'
          mode="outlined"
          small
          icon="keyboard-arrow-right"
          style={styles.nextButton}
          onPress={this.props.onNext}>Próximo</Button>

        {
          this.props.canReturn == true &&
          <TouchableNativeFeedback
            backgroundColor={TouchableNativeFeedback.Ripple("#eee", true)}
            onPress={this.props.onClose}>
            <View style={styles.closeButton}>
              <FAIcon name="arrow-left" color="#ccc" size={20}></FAIcon>
            </View>
          </TouchableNativeFeedback>
        }

      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    elevation: 2,
    backgroundColor: 'white',
    width: '95%',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 10,
    height: heightValue,
    borderRadius: 4,
    alignItems: 'center',
    padding: 10
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    left: 10,
    padding: 5,
    borderRadius: 50
  },
  topBoxLine: {
    width: '20%',
    height: 6,
    backgroundColor: '#F1F1F1',
    alignSelf: 'center',
    margin: 7,
    borderRadius: 10
  },
  // TRANSPORT CONTAINER
  selectTransport: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  transportText: {
    fontFamily: fonts.primary,
    color: '#C9C9C9',
    marginBottom: 10
  },
  transportContainer: {
    flexDirection: 'row',
    alignSelf: 'center'
  },
  transportButton: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#ebebeb',
    margin: 5
  },
  // INFO CONTAINER
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  textInfoContainer: {
    alignItems: 'center',
    marginLeft: 25,
    marginRight: 25
  },
  infoTextLabel: {
    fontFamily: fonts.primary,
    color: '#C5C5C5'
  },
  infoText: {
    fontFamily: fonts.primary,
    color: colors.primaryColor,
    fontSize: 40
  },
  nextButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
    borderColor: '#47C1CF',
    borderWidth: 1
  }
})