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

class Contatos extends Component {

  constructor() {
    super()
    this.state = {
      contatos: [
        {
          id: 4,
          name: "Ana Júlia",
          username: "@aj_brb",
          profileImage: require('@assets/images/event-test-image.jpg')
        },
        {
          id: 6,
          name: "Alan F.",
          username: "@alan_ff_gamer",
          profileImage: require('@assets/images/event-test-image.jpg')
        },
        {
          id: 2,
          name: "Bia",
          username: "@bia_kun",
          profileImage: require('@assets/images/event-test-image.jpg')
        },
        {
          id: 5,
          name: "Bruno Willian",
          username: "@brn_willian",
          profileImage: require('@assets/images/event-test-image.jpg')
        },
        {
          id: 1,
          name: "Gustavo",
          username: "@gustavo",
          profileImage: require('@assets/images/event-test-image.jpg')
        },
        {
          id: 3,
          name: "Tiago",
          username: "@tg_silva",
          profileImage: require('@assets/images/event-test-image.jpg')
        },
      ]
    }
    this.scrollValue = 0
  }

  render() {

    const isFirstFromChar = (string, index) => {
      const { contatos } = this.state;
      let lastContact = contatos[index - 1]
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
          <SearchField placeholder="Digite o nome do Contato"
            style={{ margin: 15 }} />

          <FlatList
            data={this.state.contatos}
            keyExtractor={item => item.id.toString()}

            renderItem={
              ({ item, index }) => (
                <ContatoRow
                  data={item}
                  rowIndex={index}
                  isFirstFromChar={isFirstFromChar(item.name, index)}
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