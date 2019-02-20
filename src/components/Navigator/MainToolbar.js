import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  Image,
  AsyncStorage,
  Animated
} from 'react-native'

import {
  IconButton
} from 'react-native-paper'

import {
  withNavigation
} from 'react-navigation'

import Transition from 'react-navigation-fluid-transitions'

import TouchableScale from 'react-native-touchable-scale'

import colors from '@/resources/colors'
import fonts from '@/resources/fonts'

import EventBus from 'eventing-bus'

import store from '@/store'

class MainToolbar extends Component {

  constructor() {
    super();
    this.state = {
      userData: store.loggedUserInfo
    }
  }

  componentDidMount() {
    
  }


  render() {

    const { userData } = this.state

    return (
      <View style={[styles.container]}>
        <StatusBar backgroundColor={colors.primaryDark}
          animated />
        <View style={styles.toolbarContainer}>
          <View style={styles.titleContainer}>
            <TouchableScale style={styles.userImageContainer}
              rippleSpeed={.6}
              onPress={() => { this.props.navigation.navigate('Perfil', { userData }) }}>
              <Image style={styles.userImage}
                source={{ uri: userData.photoURL }}
              />
            </TouchableScale>
            <Text style={styles.toolbarTitle}>{store.toolbarTitle}</Text>
          </View>
          <IconButton
            icon="notifications"
            color="#fff"
            onPress={() => {
              this.props.navigation.navigate('Notificacoes')
            }}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden'
  },
  toolbarContainer: {
    height: 60,
    backgroundColor: colors.primaryDark,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 15,
    elevation: 4,
  },
  toolbarTitle: {
    color: '#fff',
    fontFamily: fonts.primaryBold,
    fontSize: 20,
    marginLeft: 15
  },
  userImage: {
    width: 37,
    height: 37,
  },
  userImageContainer: {
    borderRadius: 100,
    borderWidth: 3,
    borderColor: colors.primaryColor,
    overflow: 'hidden'
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default withNavigation(MainToolbar)