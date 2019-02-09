import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  RefreshControl 
} from 'react-native'

import SLIcon from 'react-native-vector-icons/SimpleLineIcons'

import EventsSearchField from '@/components/Eventos/EventsSearchField'
import PendingEventCard from '@/components/Eventos/PendingEventCard'

import fonts from '@/resources/fonts'

import {
  Line
} from '@/components/Forms'

export default class Pendentes extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <EventsSearchField />
        <View style={styles.eventosContainer}>
          <PendingEventCard date={Date.now()}
                            title={"Aniversário da Laura"}></PendingEventCard>
          <PendingEventCard date={Date.now()}
                            title={"Praia"}></PendingEventCard>
           <PendingEventCard date={Date.now()}
                            title={"Casa do seu Jorge"}></PendingEventCard>
            <PendingEventCard date={Date.now()}
                            title={"Culto JNI"}></PendingEventCard>
                    
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F9FAFC",
    padding: 20
  },
  eventosContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
})
