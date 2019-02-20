import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  FlatList
} from 'react-native'

import {
  FAB
} from 'react-native-paper'

import {
  withNavigation
} from 'react-navigation'

import EventBus from 'eventing-bus';

import SearchField from '@/components/SearchField'
import ContatoRow from '@/components/Contatos/ContatoRow'

import firebase from 'react-native-firebase'

import store from '@/store'

class Contatos extends Component {

  constructor() {
    super()
    this.state = {
      contacts: [],
      searchContacts: []
    }
    this.scrollValue = 0
  }

  componentDidMount() {
    store.loggedUserContacts.forEach(async id => {
      let contact = await firebase.firestore()
        .collection('users')
        .doc(id)
        .get();

      const { name, phone, photoURL, username } = contact.data()
      let addContact = {
        id: contact.id,
        name,
        username: "@" + username,
        phone,
        photoURL
      }

      this.setState({
        contacts: [
          ...this.state.contacts,
          addContact
        ]
      })

      this.setState({ searchContacts: this.state.contacts })

    })
  }

  search(text) {
    const { contacts } = this.state;
    let searchContacts = contacts.filter(contact => {

      let name = contact.name.toLowerCase(),
          username = contact.username.toLowerCase(),
          searchText = text.toLowerCase()

      return name.includes(searchText) 
        || username.includes(searchText)
    })
    this.setState({
      searchContacts
    })
  }

  render() {

    const isFirstFromChar = (string, index) => {
      const { contacts } = this.state;
      let lastContact = contacts[index - 1]
      if (lastContact) {
        if (lastContact.name.charAt(0).toUpperCase() != string.charAt(0).toUpperCase()) {
          return true
        } else {
          return false
        }
      } else {
        return true
      }
    }

    return (

      <View style={{ flex: 1 }}>
        <ScrollView>
          <SearchField
            placeholder="Digite o nome ou @ do contato"
            style={{ margin: 15 }}
            onChangeText={this.search.bind(this)}
          />

          <FlatList
            data={this.state.searchContacts}
            keyExtractor={item => item.id}

            renderItem={
              ({ item, index }) => (
                <ContatoRow
                  data={item}
                  rowIndex={index}
                  isFirstFromChar={isFirstFromChar(item, index)}
                />
              )
            }
          />
        </ScrollView>
        <FAB
          icon="person-add"
          style={styles.fabProcurar}
          onPress={() => this.props.navigation.push('Procurar')}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  fabProcurar: {
    position: 'absolute',
    right: 20,
    bottom: 20
  }
})

export default withNavigation(Contatos)