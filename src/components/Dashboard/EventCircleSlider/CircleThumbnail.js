import React, { Component } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'

import TouchableScale from 'react-native-touchable-scale'

import { withNavigation } from 'react-navigation'

class CircleThumbnail extends Component {
  render() {

    return (
      <TouchableScale
        style={styles.circle}
        onPress={
          () => {
            const { navigate } = this.props.navigation
            if (this.props.id) {
              navigate('LocalizacoesUsuarios', {
                eventID: this.props.id
              })
            } else {
              navigate('EventosAceitos')
            }
          }
        }>
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
    width: 80,
    height: 80,
    borderStyle: 'dashed',
    borderColor: '#D2D2D2',
    borderWidth: 1,
    marginHorizontal: 5,
    borderRadius: 100,
    padding: 3
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 100
  }
})

export default withNavigation(CircleThumbnail)