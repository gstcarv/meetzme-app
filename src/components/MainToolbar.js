import React, { Component } from 'react'
import { 
  Text,
  StyleSheet, 
  View,
  StatusBar,
  Image,
  AsyncStorage,
} from 'react-native'

import {
  IconButton
} from 'react-native-paper'

import {
  withNavigation
} from 'react-navigation'

import TouchableScale from 'react-native-touchable-scale'

import colors from '@/resources/colors'
import fonts from '@/resources/fonts'

class MainToolbar extends Component {

  constructor(){
    super();
    this.state = {
      profileImage: null
    }
  }

  componentDidMount(){
    const userData = AsyncStorage.getItem('USER_DATA')
    .then(user => {
      user = JSON.parse(user)
      this.setState({
        profileImage: user.photoURL
      });
    })
  }

  render() {
    return (
      <View>
        <StatusBar backgroundColor={colors.primaryDark} 
                   animated />
        <View style={styles.toolbarContainer}>
          <View style={styles.titleContainer}>
            <TouchableScale style={styles.userImageContainer}
                      rippleSpeed={.6}>
              <Image style={styles.userImage}
                    source={{ uri: this.state.profileImage }}></Image>
            </TouchableScale>
            <Text style={styles.toolbarTitle}>{this.props.children || "Toolbar Title"}</Text>
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
  toolbarContainer: {
    height: 60,
    backgroundColor: colors.primaryColor,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 15,
    elevation: 4
  },
  toolbarTitle: {
    color: '#fff',
    fontFamily: fonts.primaryBold,
    fontSize: 20,
    marginLeft: 15
  },
  userImage: {
    width: 30,
    height: 30,
  },
  userImageContainer: {
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#68727D',
    overflow: 'hidden'
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default withNavigation(MainToolbar)