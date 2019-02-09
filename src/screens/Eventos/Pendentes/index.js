import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  FlatList
} from 'react-native'

import SLIcon from 'react-native-vector-icons/SimpleLineIcons'

import EventsSearchField from '@/components/Eventos/EventsSearchField'
import PendingEventCard from '@/components/Eventos/PendingEventCard'
import PendingEventBottomSheet from '@/components/Eventos/PendingEventBottomSheet'

import fonts from '@/resources/fonts'

import {
  Line
} from '@/components/Forms'

export default class Pendentes extends Component {

  constructor(){
    super()
    this.state = {
      convites: [
        {
          id: "1",
          title: "Aniversário Jorge",
          date: Date.now()
        },
        {
          id: "2",
          title: "Praia",
          date: Date.now()
        },
        {
          id: "3",
          title: "Casa do seu Jorge",
          date: Date.now()
        },
        {
          id: "4",
          title: "Shopping",
          date: Date.now()
        },
        {
          id: "5",
          title: "Centro da Cidade",
          date: Date.now()
        }
      ]
    }
  }

  openEventSheet(id){
    this.refs.eventBottomSheet.open(id);
  }
  
  render() {
    return (
      <View>
        <ScrollView style={styles.container}>
          <EventsSearchField />


          <View style={styles.eventosContainer}>
                      
          <FlatList 
            data={this.state.convites}
            renderItem={({item}) => (
              <PendingEventCard 
                title={item.title}
                date={item.date}
                onPress={() => this.openEventSheet(item.id)} />
            )}
            keyExtractor={(convite) => convite.id}
            numColumns={2}
          />
          </View>

          <Line spaceVertical={15} />
        </ScrollView>
        <PendingEventBottomSheet ref="eventBottomSheet"/>
      </View>
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
