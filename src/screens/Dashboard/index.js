import React, { Component } from 'react'
import { Text, StyleSheet, View, Button } from 'react-native'

import MainToolbar from '@/components/MainToolbar'
import firebase from 'react-native-firebase'

export default class Dashboard extends Component {
  render() {
    return (
      <View>
        <MainToolbar>Dashboard</MainToolbar>
        <View style={{padding: 20}}>
          <Button title="SignOut"
            onPress={() => firebase.auth().signOut()}></Button>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({})
