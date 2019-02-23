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

import { inject, observer } from 'mobx-react/native'
import { toJS } from 'mobx'

@inject('ContactsStore')
@observer
class Contatos extends Component {

  constructor(props) {
    super(props)
    this.state = {
      contacts: [],
      searchContacts: [],
      searchText: ''
    }
    this.scrollValue = 0
  }

  componentWillMount() {
    this.focusSub = null
  }

  render() {

    const { ContactsStore } = this.props;

    const isFirstFromChar = (string, index) => {
      const { contacts } = this.state;
      let lastContact = contacts[index - 1]
      if (lastContact) {
        if (lastContact.name.toString().charAt(0).toUpperCase() != string.toString().charAt(0).toUpperCase()) {
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
            onChangeText={text => ContactsStore.search(text)}
          />

          <FlatList
            data={ContactsStore.searchContacts}
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