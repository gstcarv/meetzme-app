import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  StatusBar,
  ScrollView,
  FlatList,
  Keyboard,
  AsyncStorage,
} from 'react-native'

import {
  Text, Snackbar
} from 'react-native-paper'

import { Line } from '@/components/Forms'

import SearchToolbar from '@/components/Procurar/SearchToolbar'
import ContatoRow from '@/components/Contatos/ContatoRow'
import BackBar from '@/components/BackBar'

import UserProfileBottomSheet from '@/components/Contatos/UserProfileBottomSheet'

import colors from '@/resources/colors'
import fonts from '@/resources/fonts'

import firebase from 'react-native-firebase'

import { inject, observer } from 'mobx-react/native'

@inject('ContactsStore')
@observer
export default class Procurar extends Component {

  constructor() {
    super()
    this.state = {
      usuarios: [],
      loading: false,
      isEmptyText: true
    },
      this.firestoreRef = firebase.firestore();
  }

  async search(text) {
    if (text != "") {
      try {
        this.setState({
          loading: true,
          isEmptyText: false
        })

        let searchUsers = await this.firestoreRef
          .collection('users')
          .orderBy("name")
          .startAt(text).endAt(text + "\uf8ff")
          .limit(20)
          .get();

        let usuarios = [];

        searchUsers.forEach(doc => {
          const { name, phone, photoURL, username } = doc.data()
          usuarios.push({
            id: doc.id,
            name,
            username: "@" + username,
            phone,
            photoURL
          })
        })

        this.setState({
          usuarios,
          loading: false
        })

      } catch (err) {}
    } else {
      this.setState({ isEmptyText: true })
    }
  }

  _onUserPress(data) {
    this.UserProfileBottomSheet.open(data)
  }

  async addContact(user) {
    await this.props.ContactsStore.addContact(user)
  }

  async removeContact(user) {
    await this.props.ContactsStore.removeContact(user) 
  }

  render() {

    const usersLenght = this.state.usuarios.length;

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.primaryDark}
          animated />
        <BackBar
          color={colors.primaryDark}
          noElevation
          title="Procurar"
        />
        <SearchToolbar
          onChangeText={this.search.bind(this)}
          loading={this.state.loading}

        />

        {

          this.state.isEmptyText == false &&
          usersLenght > 0 &&
          <ScrollView style={styles.svContainer}
            keyboardShouldPersistTaps="always"
            keyboardDismissMode='on-drag'
            onScroll={() => Keyboard.dismiss()}>

            <View style={styles.personsContainer}>
              <Text style={styles.text}>Pessoas</Text>
              <FlatList
                data={this.state.usuarios}
                keyExtractor={item => item.id.toString()}
                keyboardShouldPersistTaps="always"
                keyboardDismissMode='on-drag'
                renderItem={
                  ({ item, index }) => (
                    <ContatoRow
                      data={item}
                      rowIndex={index}
                      noIcon
                      onPress={this._onUserPress.bind(this)}
                    />
                  )
                }
              />
            </View>

            <Line spaceVertical={20} />

          </ScrollView>
        }

        {
          this.state.isEmptyText &&
          <View style={styles.textContainer}>
            <Text style={styles.textTitle}>Encontre Pessoas</Text>
            <Text style={styles.textDescription}>Adicione mais pessoas aos seus contatos para compartilhar sua diversão com os amigos!</Text>
          </View>
        }

        {
          this.state.isEmptyText == false &&
          this.state.loading == false &&
          usersLenght == 0 &&
          <View style={styles.textContainer}>
            <Text style={styles.textTitle}>Não encontrado</Text>
            <Text style={styles.textDescription}>Tente procurar por palavras chave mais relevantes.</Text>
          </View>
        }

        <UserProfileBottomSheet
          ref={ref => this.UserProfileBottomSheet = ref}
          onAddButtonPress={(data) => this.addContact(data)}
          onRemoveButtonPress={(data) => this.removeContact(data)}
        />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFC'
  },
  svContainer: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  personsContainer: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 15,
    elevation: 2,
    borderRadius: 3
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  textTitle: {
    fontFamily: fonts.primaryBold,
    color: colors.primaryColor,
    fontSize: 40
  },
  textDescription: {
    color: "#aaa",
    fontSize: 17,
    marginTop: 15
  },
  text: {
    color: "#cacaca",
    marginBottom: 5
  }
})
