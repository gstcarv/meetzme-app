import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  FlatList,
  Dimensions
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

import Carousel from 'react-native-snap-carousel';

import EventInfoBottomSheet from '@/components/Eventos/EventInfoBottomSheet';
import EventCard from '@/components/Eventos/EventCard';

const { 
  width: screenWidth, 
  height: screenHeight 
} = Dimensions.get('window');

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
    let event = this.props.EventsStore.getByID(eventID);

    if (new Date(Date.now()) >= event.initTrackingDatetime) {
      this.props.navigation.navigate('LocalizacoesUsuarios', { eventID })
    } else {
      this.refs.eventBottomSheet.open(eventID, true);
    }
  }

  render() {

    const { EventsStore } = this.props

    var hasEvent = EventsStore.acceptedEvents.length > 0;

    return (
      <View style={styles.container}>

        {
          hasEvent &&
          <Carousel
            ref={ref => this.eventsSlider = ref}
            data={toJS(EventsStore.acceptedEvents)}
            renderItem={({ item }) => (
              <EventCard
                eventData={item}
                onPress={this.goToEvent.bind(this)}
              />
            )}
            sliderWidth={screenWidth}
            itemWidth={screenWidth - 10}
            layout={'stack'} layoutCardOffset={20}
            slideStyle={{ 
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'visible',
              paddingVertical: 15,
              paddingHorizontal: 25,
            }}
            firstItem={EventsStore.acceptedEvents.length - 1}
            activeAnimationType={'spring'}
          />
        }

        {
          // hasEvent &&
          
        }

        {
          hasEvent &&
          <EventInfoBottomSheet
            ref="eventBottomSheet"
          />
        }

        {
          !hasEvent &&
          <View style={styles.emptyContainer}>
            <SLIcon name="ghost" size={150} color="#eee"></SLIcon>
            <Text style={styles.emptyText}>Nada por aqui! Que tal criar um novo evento?</Text>
            <Line spaceVertical={15} />
          </View>
        }

      </View>
    )
  }
}

export default withNavigation(Aceitos)

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F9FAFC",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContainer: {
    flex: 1
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: fonts.primary,
    color: '#ccc',
    fontSize: 25,
    marginTop: 30,
    textAlign: 'center'
  }
})
