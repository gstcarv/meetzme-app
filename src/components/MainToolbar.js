import React, { Component } from 'react'
import { 
  Text,
  StyleSheet, 
  View,
  StatusBar,
  Image,
  AsyncStorage
} from 'react-native'

import RippleView from 'react-native-material-ripple'

import FAIcon from 'react-native-vector-icons/FontAwesome5'

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
      console.log(user)
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
          <RippleView style={styles.userImageContainer}
                    rippleSpeed={.6}>
            <Image style={styles.userImage}
                   source={{ uri: this.state.profileImage }}></Image>
          </RippleView>
          <Text style={styles.toolbarTitle}>{this.props.children || "Toolbar Title"}</Text>
          <FAIcon size={20} color="#fff" name="bell"></FAIcon>
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
    paddingHorizontal: 15
  },
  toolbarTitle: {
    color: '#fff',
    fontFamily: fonts.primaryBold,
    fontSize: 20
  },
  userImage: {
    width: 35,
    height: 35,
  },
  userImageContainer: {
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#68727D',
    overflow: 'hidden'
  }
})
