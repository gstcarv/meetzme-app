import React, { Component } from 'react'
import { 
  Text,
  StyleSheet, 
  View,
  StatusBar,
  Image,
  AsyncStorage,
} from 'react-native'

import TouchableScale from 'react-native-touchable-scale'

import Icon from 'react-native-vector-icons/FontAwesome'

import colors from '@/resources/colors'
import fonts from '@/resources/fonts'

export default class MainToolbar extends Component {

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
          <TouchableScale>
            <View>
              <Icon size={20} color="#fff" name="bell"></Icon>
            </View>
          </TouchableScale>
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
    paddingHorizontal: 15,
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
