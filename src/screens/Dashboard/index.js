import React, { Component } from 'react'
import { Text, StyleSheet, View, Button } from 'react-native'
import { withNavigation } from 'react-navigation'

import firebase from 'react-native-firebase'

class Dashboard extends Component {

  signout(){
    firebase.auth().signOut()
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <View>
        <View style={{padding: 20}}>
          <Button title="SignOut"
            onPress={() => this.signout()}></Button>
        </View>
      </View>
    )
  }
}

export default withNavigation(Dashboard)

const styles = StyleSheet.create({})
