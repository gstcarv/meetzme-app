import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View,
  Animated,
  Easing,
  TouchableNativeFeedback,
  BackHandler
} from 'react-native'

import FAIcon from 'react-native-vector-icons/FontAwesome5'

import fonts from '@/resources/fonts'
import colors from '@/resources/colors'
import TouchableTransportButton from './DirectionInfoBox/TouchableTransportButton';

const heightValue = 200;
const initialTranslateValue = heightValue + 20;

export default class DirectionInfoBox extends Component {

  constructor() {
    super();
    this.state = {
      transport: "driving",
      visible: false
    }
    this.boxTranslate = new Animated.Value(initialTranslateValue);
  }

  componentWillMount(){
    if(this.props.canReturn){
      BackHandler.addEventListener('hardwareBackPress', () => {
        this.props.onClose()
        return true;
      })
    }
  }

  componentWillUnmount(){
    if(this.props.canReturn){
      BackHandler.removeEventListener('hardwareBackPress')
    }
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

  selectTransport(transport){
    this.setState({ transport })

    if(this.props.onSelectTransport) 
      this.props.onSelectTransport(transport);

  }

  render() {

    const { transport } = this.state;

    return (
      <Animated.View
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
        {
          this.props.canReturn &&
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
    width: '90%',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 20,
    height: heightValue,
    borderRadius: 4,
    alignItems: 'center'
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
    height: 3,
    backgroundColor: '#F1F1F1',
    alignSelf: 'center',
    margin: 10,
  },
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
  }
})
