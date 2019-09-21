import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View,
  Image,
  Alert
} from 'react-native'

import Snackbar from 'react-native-snackbar'

import BottomSheet from "react-native-raw-bottom-sheet";

import {
  Button
} from '@/components/Forms'

import fonts from '@/resources/fonts'
import colors from '@/resources/colors'

import ContactsStore from '@/store/ContactsStore'

export default class UserProfileBottomSheet extends Component {

  constructor() {
    super();
    this.state = {
      userData: {},
      isContact: false,
      loading: false
    }
  }

  async onAddPress() {
    try {
      this.setLoading(true)
      await ContactsStore.addContact(this.state.userData)
      this.setState({
        isContact: true
      })
    } catch {
      Alert.alert(
        "Erro",
        "Não foi possível adicionar o contato, tente novamente mais tarde",
      )
    } finally {
      this.setLoading(false)
    }
  }

  onRemovePress() {
    Alert.alert(
      "Apagar Contato",
      "Deseja apagar esse contato?",
      [
        {
          text: "Cancelar"
        },
        {
          text: 'Apagar', onPress: () => {
            this.removeContact()
          }
        },
      ],
    )
  }

  async removeContact() {
    try {
      this.setLoading(true)
      await ContactsStore.removeContact(this.state.userData)
      this.setState({
        isContact: false
      })
    } catch {
      Alert.alert(
        "Erro",
        "Não foi possível remover o contato, tente novamente mais tarde",
      )
    } finally {
      this.setLoading(false)
    }

  }

  open(userData) {
    this.setState({
      userData,
      isContact: ContactsStore.isContact(userData)
    })

    this.EventSheet.open()
  }

  setLoading(isLoading) {
    this.setState({ loading: isLoading })
  }

  render() {

    const { name, username, photoURL } = this.state.userData

    return (
      <BottomSheet
        ref={ref => {
          this.EventSheet = ref;
        }}
        height={230}
        duration={300}
        customStyles={{
          container: {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            paddingHorizontal: 20
          }
        }}
      >
        <View style={styles.topSheetLine} />

        <View style={styles.sheetHeadContainer}>
          <Image source={{ uri: photoURL }}
            style={styles.userImage}
          />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{name}</Text>
            <Text style={styles.userHash}>{username}</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>

          {
            this.state.isContact == false ?
            <Button color={colors.primaryColor}
              icon="person-add"
              mode="outlined"
              small
              style={styles.buttonStyle}
              loading={this.state.loading}
              disabled={this.state.loading}
              onPress={this.onAddPress.bind(this)}>Adicionar</Button>
          : <Button color={colors.primaryColor}
              icon="check"
              mode="contained"
              small
              style={styles.buttonStyle}
              loading={this.state.loading}
              disabled={this.state.loading}
              onPress={this.onRemovePress.bind(this)}>Já é um contato</Button>
          }

        </View>

      </BottomSheet>
    )
  }
}

const styles = StyleSheet.create({
  topSheetLine: {
    width: '40%',
    height: 8,
    backgroundColor: '#F1F1F1',
    alignSelf: 'center',
    margin: 10,
  },
  sheetHeadContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: "#F6F6F6"
  },
  inviteNumberContainer: {
    alignItems: 'center'
  },
  userInfo: {
    marginLeft: 20
  },
  userName: {
    fontFamily: fonts.primaryBold,
    color: colors.primary,
    fontSize: 18
  },
  userHash: {
    fontFamily: fonts.primary,
    color: "#6D6D6D"
  },
  buttonContainer: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    marginTop: 15
  },
  buttonStyle: {
    borderColor: colors.primaryColor,
    fontSize: 10,
    borderWidth: 1,
    marginTop: 10
  }
})
