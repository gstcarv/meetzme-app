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

import BackButton from '@/components/BackButton'

import ProfileDataRow from '@/components/Perfil/ProfileDataRow'
import UserPhotoThumbnail from '@/components/Perfil/UserPhotoThumbnail'
import EditUserBottomSheet from '@/components/Perfil/EditUserBottomSheet'

import {
  withNavigation
} from 'react-navigation'

import colors from '@/resources/colors'

import Snackbar from 'react-native-snackbar'

import { inject, observer } from 'mobx-react/native'

@inject('LoggedUserStore')
@observer
class Perfil extends Component {

  constructor() {
    super()
  }

  async editName(name) {
    this.setState({ showEditNameDialog: false })
    setTimeout(() => {
      Snackbar.show({
        title: 'Seu nome foi alterado',
        duration: Snackbar.LENGTH_LONG,
      })
    }, 1000)
    await this.props.LoggedUserStore.updateData({
      name
    })
  }

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
              onPress={() => {
                this.editBottomSheet.open({
                  title: "Digite seu nome",
                  initialText: infoUser.name,
                  submitButtonText: "Salvar",
                  onSubmit: (text) => this.editName(text)
                })
              }}
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

          <EditUserBottomSheet
            ref={
              ref => this.editBottomSheet = ref
            }
          />

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