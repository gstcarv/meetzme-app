import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  StatusBar,
  ScrollView,
  FlatList,
  Keyboard
} from 'react-native'

import {
  Text
} from 'react-native-paper'

import { Line } from '@/components/Forms'

import SearchToolbar from '@/components/Procurar/SearchToolbar'
import colors from '@/resources/colors'

import PersonRow from '@/components/Contatos/ContatoRow'

export default class Procurar extends Component {

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
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.primaryDark}
          animated />
        <SearchToolbar />
        <ScrollView style={styles.svContainer}
          keyboardShouldPersistTaps="always"
          keyboardDismissMode='on-drag'
          onScroll={() => Keyboard.dismiss()}>
          <FlatList
            data={this.state.contatos}
            keyExtractor={item => item.id.toString()}
            keyboardShouldPersistTaps="always"
            keyboardDismissMode='on-drag'
            renderItem={
              ({ item, index }) => (
                <PersonRow
                  data={item}
                  rowIndex={index}
                  icon="person-add"
                />
              )
            }
          />

          <Line spaceVertical={20} />

          <Text style={{ 
            marginBottom: 20,
            alignSelf: 'center',
            color: "#ccc"
          }}>{this.state.contatos.length} Resultados</Text>

        </ScrollView>
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
  }
})
