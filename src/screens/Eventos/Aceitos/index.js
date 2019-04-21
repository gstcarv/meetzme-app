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

import SLIcon from 'react-native-vector-icons/SimpleLineIcons'

import { withNavigation } from 'react-navigation'

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
class Aceitos extends Component {

  constructor(props) {
    super();
    this.state = {
      searchText: ""
    }
  }

  goToEvent(eventID) {
    this.props.navigation.navigate('LocalizacoesUsuarios', { eventID })
  }

  render() {

    const { EventsStore } = this.props

    return (
      <ScrollView style={styles.container}
        overScrollMode="always">

        {
          EventsStore.acceptedEvents.length > 0 &&

          <View>
            <SearchField
              placeholder="Digite o nome do Evento"
              onChangeText={searchText => this.setState({ searchText })}
            />

            <FlatList
              data={toJS(EventsStore.searchAcceptedEvents(this.state.searchText))}
              keyExtractor={item => item.id}
              renderItem={
                ({ item, index }) => (
                  <TimelineEvent
                    eventData={item}
                    rowIndex={index}
                    onPress={this.goToEvent.bind(this)}
                  />
                )
              }
              style={{ marginBottom: 40 }}
            />
          </View>
        }

        {
          EventsStore.acceptedEvents.length == 0 &&

          <View style={styles.emptyContainer}>
            <SLIcon name="ghost" size={150} color="#eee"></SLIcon>
            <Text style={styles.emptyText}>Nada por aqui! Que tal criar um novo evento?</Text>
            <Line spaceVertical={15} />
          </View>
        }

      </ScrollView>
    )
  }
}

export default withNavigation(Aceitos)

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F9FAFC",
    padding: 20,
    flex: 1,
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
