import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  RefreshControl 
} from 'react-native'

import { Button } from 'react-native-paper'

import SLIcon from 'react-native-vector-icons/SimpleLineIcons'

import TimelineEvent from '@/components/Eventos/TimelineEvent'
import SearchField from '@/components/SearchField'

import fonts from '@/resources/fonts'

import {
  Line
} from '@/components/Forms'

export default class Aceitos extends Component {
  render() {
    return (
      <ScrollView style={styles.container}
      overScrollMode="always">
        <SearchField placeholder="Digite o nome do Evento"/>
        <TimelineEvent date={Date.now()}
                      title="Titulo do Evento"
                      local="Rua Lucélia Nº 278 - Jardim Nova Europa - Hortolândia"/>
        <TimelineEvent date={Date.now()}
                      title="Titulo do Evento"
                      local="Rua Lucélia Nº 278 - Jardim Nova Europa - Hortolândia"
                      admin />
        <TimelineEvent date={Date.now()}
                      title="Titulo do Evento"
                      local="Rua Lucélia Nº 278 - Jardim Nova Europa - Hortolândia"/>
        <TimelineEvent date={Date.now()}
                      title="Titulo do Evento"
                      local="Rua Lucélia Nº 278 - Jardim Nova Europa - Hortolândia"/>
        <TimelineEvent date={Date.now()}
                      title="Titulo do Evento"
                      local="Rua Lucélia Nº 278 - Jardim Nova Europa - Hortolândia"/>
        <TimelineEvent date={Date.now()}
                      title="Titulo do Evento"
                      local="Rua Lucélia Nº 278 - Jardim Nova Europa - Hortolândia"/>
        <TimelineEvent date={Date.now()}
                      title="Titulo do Evento"
                      local="Rua Lucélia Nº 278 - Jardim Nova Europa - Hortolândia"/>
        <TimelineEvent date={Date.now()}
                      title="Titulo do Evento"
                      local="Rua Lucélia Nº 278 - Jardim Nova Europa - Hortolândia"/>
          {/* <View style={styles.emptyContainer}>
            <SLIcon name="ghost" size={150} color="#eee"></SLIcon>
            <Text style={styles.emptyText}>Nada por aqui! Que tal criar um novo evento?</Text>
          </View> */}
          <Line spaceVertical={15}/> 
      </ScrollView>
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
