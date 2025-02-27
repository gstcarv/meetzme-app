import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  FlatList
} from 'react-native'

import {
  FAB,
  Text
} from 'react-native-paper'

import {
  withNavigation
} from 'react-navigation'

import SearchField from '@/components/SearchField'
import ContatoRow from '@/components/Contatos/ContatoRow'
import UserProfileBottomSheet from '@/components/Contatos/UserProfileBottomSheet'

import { toJS } from 'mobx'

import { inject, observer } from 'mobx-react/native'

@inject('ContactsStore')
@observer
class Contatos extends Component {

  constructor(props) {
    super(props)
    this.state = {
      searchContacts: [],
      searchText: ''
    }
    this.scrollValue = 0
  }

  componentWillMount() {
    this.focusSub = null
  }

  _onContactPress(data) {
    this.UserProfileBottomSheet.open(data)
  }

  render() {

    const { ContactsStore } = this.props;

    const isFirstFromChar = (string, index) => {
      let lastContact = ContactsStore.contacts[index - 1]

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
            keyExtractor={item => item.uid}

            renderItem={
              ({ item, index }) => (
                <ContatoRow
                  data={item}
                  rowIndex={index}
                  isFirstFromChar={isFirstFromChar(item.name, index)}
                  onPress={this._onContactPress.bind(this)}
                />
              )
            }
          />

          {
            toJS(ContactsStore.searchContacts).length == 0 &&
            <Text style={{textAlign: 'center'}}>Nenhum contato encontrado</Text>
          }

        </ScrollView>

        <UserProfileBottomSheet
          ref={ref => this.UserProfileBottomSheet = ref}
        />

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