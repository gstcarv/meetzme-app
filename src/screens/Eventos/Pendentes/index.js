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

import Snackbar from 'react-native-snackbar'

import {
  withNavigation
} from 'react-navigation'

import SearchField from '@/components/SearchField'
import PendingEventCard from '@/components/Eventos/PendingEventCard'
import PendingEventBottomSheet from '@/components/Eventos/PendingEventBottomSheet'

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

  openEventSheet(id) {
    this.refs.eventBottomSheet.open(id);
  }

  _onRecuseEvent(event){
    const { EventsStore } = this.props;
    EventsStore.recuseEvent(event.id);
    setTimeout(() => {
      Snackbar.show({
        title: 'Convite Recusado',
        duration: Snackbar.LENGTH_LONG,
        action: {
          title: 'Desfazer',
          color: '#fff',
          onPress: () => {
            EventsStore.undoRecuse(event);
          },
        },
      })
    }, 500)
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <SearchField placeholder="Digite o nome do Evento" />

          <View style={styles.eventosContainer}>

            <FlatList
              data={toJS(this.props.EventsStore.pendingEvents)}
              renderItem={({ item }) => (
                <PendingEventCard
                  eventData={item}
                  onPress={() => this.openEventSheet(item.id)} />
              )}
              keyExtractor={(convite) => convite.id}
              numColumns={2}
            />
          </View>

          <Line spaceVertical={15} />
        </ScrollView>
        <PendingEventBottomSheet
          ref="eventBottomSheet"
          onNext={(infoEvento) => {
            this.props.navigation.navigate('LocalizacaoEventoPendente', { infoEvento })
          }}
          onRecuse={this._onRecuseEvent.bind(this)} />
      </View>
    )
  }
}

export default withNavigation(Pendentes)

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F9FAFC",
    padding: 20,
    flex: 1
  },
  scrollView: {
    flex: 1
  },
  eventosContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
})
