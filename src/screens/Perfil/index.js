import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View,
  AsyncStorage,
  Image,
  ScrollView,
  StatusBar
} from 'react-native'

import {
  FAB
} from 'react-native-paper'

import BackButton from '@/components/BackButton'


import ProfileDataRow from '@/components/Perfil/ProfileDataRow'
import UserPhotoThumbnail from '@/components/Perfil/UserPhotoThumbnail'

import {
  withNavigation
} from 'react-navigation'

import {
  TextField
} from '@/components/Forms'

import colors from '@/resources/colors'
import TouchableScale from 'react-native-touchable-scale';

import { inject, observer } from 'mobx-react/native'

@inject('LoggedUserStore')
@observer
class Perfil extends Component {

  render() {

    const infoUser = this.props.LoggedUserStore.get()

    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          animated
          backgroundColor={colors.primaryDark}
        />
        <ScrollView style={styles.container}>
          <View style={styles.headerContainer}>
            <View style={styles.headerFill}></View>
            <UserPhotoThumbnail 
              photoURL={infoUser.photoURL}
              style={styles.imageContainer}
            />
          </View>
          <View style={styles.dataContainer}>

            <ProfileDataRow
              title="Nome"
              content={infoUser.name}
              editable
              icon="user-alt"
            />

            <ProfileDataRow
              title="Usuário"
              content={"@" + infoUser.username}
              icon="user"
            />

            <ProfileDataRow
              title="Email"
              content={infoUser.email}
              icon="at"
            />

          </View>

          <BackButton color="#fff" />

        </ScrollView>

      </View >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {
    height: 270,
    backgroundColor: 'transparent'
  },
  headerFill: {
    backgroundColor: colors.primaryDark,
    height: 200
  },
  imageContainer: {
    position: 'absolute',
    bottom: 0,
    overflow: 'hidden',
    alignSelf: 'center'
  },
  dataContainer: {
    paddingTop: 20,
    paddingBottom: 20
  },
  textInput: {
    marginTop: 14
  },
  fabEdit: {
    position: 'absolute',
    bottom: 15,
    right: 15
  }
})

export default withNavigation(Perfil)