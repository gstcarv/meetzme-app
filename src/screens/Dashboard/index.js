import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  ScrollView
} from 'react-native'
import { withNavigation } from 'react-navigation'

import {
  Text
} from 'react-native-paper'

import EventCircleSlider from '@/components/Dashboard/EventCircleSlider'

import { inject, observer } from 'mobx-react/native'
import { toJS } from 'mobx';

@inject('EventsStore')
@inject('ContactsStore')
@observer
class Dashboard extends Component {

  render() {


    const { 
      EventsStore,
      ContactsStore
    } = this.props;

    let numEvents = toJS(EventsStore.acceptedEvents).length;
    let numConvites = toJS(EventsStore.pendingEvents).length;
    let numContacts = toJS(ContactsStore.contacts).length;

    return (
      <ScrollView style={styles.container}>
        <View style={styles.userStats}>
          <View style={styles.statSquare}>
            <Text style={styles.statNumber}>{numConvites}</Text>
            <Text style={styles.statTitle}>Convites</Text>
          </View>
          <View style={[styles.statSquare, styles.centerSquare]}>
            <Text style={styles.statNumber}>{numEvents}</Text>
            <Text style={styles.statTitle}>Eventos</Text>
          </View>
          <View style={styles.statSquare}>
            <Text style={styles.statNumber}>{numContacts}</Text>
            <Text style={styles.statTitle}>Contatos</Text>
          </View>
        </View>
        <View style={{
          paddingVertical: 25
        }}>
          <EventCircleSlider
            title="Proximos Eventos"
            data={toJS(EventsStore.acceptedEvents)}
            limit={10}
          />

          <EventCircleSlider
            title="Eventos criados por você"
            data={toJS(EventsStore.userCreatedEvents)}
            limit={6}
          />
        </View>
      </ScrollView>
    )
  }
}

export default withNavigation(Dashboard)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFC"
  },
  userStats: {
    flexDirection: 'row',
    textAlign: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#EBEBEB'
  },
  statSquare: {
    paddingVertical: 20,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    justifyContent: 'center'
  },
  centerSquare: {
    borderLeftWidth: 2,
    borderRightColor: '#EBEBEB',
    borderRightWidth: 2,
    borderLeftColor: '#EBEBEB',
  },
  statNumber: {
    textAlign: 'center',
    fontSize: 30,
    // fontFamily: fonts.primaryBold,
    marginBottom: 4
  },
  statTitle: {
    textAlign: 'center',
    color: '#B1B1B1',
  }
})
