import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  FlatList
} from 'react-native'

import TimelineEvent from '@/components/Eventos/TimelineEvent'
import SearchField from '@/components/SearchField'

import fonts from '@/resources/fonts'

import {
  Line
} from '@/components/Forms'


import { 
  inject, 
  observer 
} from 'mobx-react/native'

import { toJS } from 'mobx'

@inject('EventsStore')
@observer
export default class Aceitos extends Component {
  render() {

    console.log(toJS(this.props.EventsStore.events))

    return (
      <ScrollView style={styles.container}
        overScrollMode="always">

        <SearchField placeholder="Digite o nome do Evento" />

        <FlatList
          data={toJS(this.props.EventsStore.events)}
          keyExtractor={item => item.id}

          renderItem={
            ({ item, index }) => (
              <TimelineEvent
                eventData={item}
                rowIndex={index}
              />
            )
          }
        />
        {/* <View style={styles.emptyContainer}>
            <SLIcon name="ghost" size={150} color="#eee"></SLIcon>
            <Text style={styles.emptyText}>Nada por aqui! Que tal criar um novo evento?</Text>
          </View> */}
        {/* <Line spaceVertical={15} /> */}
      </ScrollView >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F9FAFC",
    padding: 20,
    flex: 1
  },
  emptyContainer: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    fontFamily: fonts.primary,
    color: '#ccc',
    fontSize: 25,
    marginTop: 30,
    textAlign: 'center'
  }
})
