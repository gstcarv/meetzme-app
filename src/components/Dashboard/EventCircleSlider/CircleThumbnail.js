import React, { Component } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'

import TouchableScale from 'react-native-touchable-scale'

import { withNavigation } from 'react-navigation'

import EventsStore from '@/store/EventsStore';

import { isEventInited } from '@/utils/events';

import Snackbar from 'react-native-snackbar';

class CircleThumbnail extends Component {

  _onPress() {
    const { navigate } = this.props.navigation
    if (this.props.id) {
      if (isEventInited(EventsStore.getByID(this.props.id))) {
        navigate('LocalizacoesUsuarios', {
          eventID: this.props.id
        })
      } else {
        Snackbar.show({
          title: 'A localização desse evento ainda não começou',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: '#b71b25'
        })
      }
    } else {
      navigate('EventosAceitos')
    }
  }

  render() {

    return (
      <TouchableScale
        style={styles.circle}
        onPress={() => this._onPress()}>
        {
          !this.props.empty &&

          <Image
            style={styles.image}
            size={50}
            source={{ uri: this.props.image }}
          />
        }
      </TouchableScale>
    )
  }
}

const styles = StyleSheet.create({
  circle: {
    width: 110,
    height: 110,
    borderStyle: 'dashed',
    borderColor: '#eee',
    borderWidth: 2,
    marginHorizontal: 5,
    borderRadius: 100,
    padding: 5
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 100
  }
})

export default withNavigation(CircleThumbnail)