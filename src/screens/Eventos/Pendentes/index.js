import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  FlatList,
  ToastAndroid
} from 'react-native'

import SLIcon from 'react-native-vector-icons/SimpleLineIcons'

import Snackbar from 'react-native-snackbar'

import {
  withNavigation
} from 'react-navigation'

import SearchField from '@/components/SearchField'
import PendingEventCard from '@/components/Eventos/PendingEventCard'
import EventInfoBottomSheet from '@/components/Eventos/EventInfoBottomSheet'

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
class Pendentes extends Component {

  constructor(props) {
    super();
    this.state = {
      searchText: ""
    }
  }

  openEventSheet(id) {
    this.refs.eventBottomSheet.open(id);
  }

  _onRecuseEvent(event) {
    const { EventsStore } = this.props;
    EventsStore.recuseEvent(event.id);
  }

  render() {

    const { EventsStore } = this.props

    return (
      <View style={styles.container}>

        {

          EventsStore.pendingEvents.length > 0 &&

          <ScrollView
            style={styles.scrollViewContainer}
            overScrollMode="always">


            <SearchField
              placeholder="Digite o nome do Evento"
              onChangeText={searchText => this.setState({ searchText })}
            />

            <View style={styles.eventosContainer}>

              <FlatList
                data={toJS(EventsStore.searchPendingEvents(this.state.searchText))}
                renderItem={({ item }) => (
                  <PendingEventCard
                    eventData={item}
                    onPress={() => this.openEventSheet(item.id)} />
                )}
                keyExtractor={(convite) => convite.id}
                numColumns={2}
              />
            </View>

            {
              EventsStore.pendingEvents.length > 0 &&
              <Line spaceVertical={15} />
            }


            <EventInfoBottomSheet
              ref="eventBottomSheet"
              onNext={(infoEvento) => {
                this.props.navigation.navigate('LocalizacaoEventoPendente', { infoEvento })
              }}
              onRecuse={this._onRecuseEvent.bind(this)}
            />

          </ScrollView>
        }

        {
          EventsStore.pendingEvents.length == 0 &&

          <View style={styles.emptyContainer}>
            <SLIcon name="envelope-open" size={150} color="#eee"></SLIcon>
            <Text style={styles.emptyText}>Nenhum convite pendente. Tem muitos compromissos?</Text>
            <Line spaceVertical={15} />
          </View>
        }

      </View>
    )
  }
}

export default withNavigation(Pendentes)

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F9FAFC",
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20
  },
  scrollViewContainer: {
    flex: 1,
  },
  eventosContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  emptyContainer: {
    flex: 1,
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
