import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View,
} from 'react-native'

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

import CardSlider from 'react-native-cards-slider';

import EventInfoBottomSheet from '@/components/Eventos/EventInfoBottomSheet';
import EventCard from '@/components/Eventos/EventCard';

import { isEventInited } from '@/utils/events'

@inject('EventsStore')
@observer
class Aceitos extends Component {

  constructor(props) {
    super();
    this.state = {
      eventSliderActiveIndex: props.EventsStore.acceptedEvents.length - 1
    }
  }

  goToEvent(eventID) {
    let event = this.props.EventsStore.getByID(eventID);
    
    if (isEventInited(event)) {
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
          <CardSlider
            style={styles.slider}
            ref={ref => this._cardSlider = ref}
            nestedScrollEnabled
            onContentSizeChange={(contentWidth, contentHeight) => {
              this._cardSlider.slider.scrollToEnd({ animated: true });
            }}>
            {
              toJS(EventsStore.acceptedEvents).map(event => (
                <View style={styles.slideContainer} key={event.id}>
                  <EventCard
                    eventData={event}
                    onPress={this.goToEvent.bind(this)}
                  />
                </View>
              ))
            }
          </CardSlider>
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFC"
  },
  slideContainer: {
    paddingVertical: 10,
    height: '100%',
  },
  slider: {
    paddingVertical: 20
  },
  scrollViewContainer: {
    flex: 1
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  emptyText: {
    fontFamily: fonts.primary,
    color: '#ccc',
    fontSize: 25,
    marginTop: 30,
    textAlign: 'center'
  }
})
