import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  FlatList,
  TouchableNativeFeedback
} from 'react-native'

import ContatoRow from "@/components/Contatos/ContatoRow"

import NestedScrollView from 'react-native-nested-scroll-view'

import {
  Line
} from '@/components/Forms'

import FAIcon from 'react-native-vector-icons/FontAwesome5'

import {
  Text
} from 'react-native-paper'

import colors from '@/resources/colors'
import fonts from '@/resources/fonts'
import sizes from '@/resources/sizes'

const { height } = Dimensions.get('window')

import moment from 'moment'

import EventsStore from '@/store/EventsStore'

export default class BottomSheetContent extends Component {

  constructor() {
    super()
    this.state = {
      eventInfo: {},
      participants: []
    }
  }

  async componentDidMount() {
    
  }

  getNestedScroll() {
    return this.NestedScrollView
  }

  render() {

    const {
      id,
      title,
      datetime,
      description,
      locationName,
      imageURL
    } = this.props.eventData.info;

    let formattedDateTime =  moment(new Date(datetime)).format("DD/MM/YYYY H:mm");
    formattedDateTime = formattedDateTime.replace(':', 'h');

    return (
      <NestedScrollView style={styles.container}
        ref={ref => this.NestedScrollView = ref}>
        <TouchableNativeFeedback onPress={() => {}}
        useForeground={true}>
          <View>
            <Image
              style={styles.image}
              source={{ uri: imageURL }}
            />
          </View>
        </TouchableNativeFeedback>
        <View style={styles.infoSpacing}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.eventDescription}>{description}</Text>
          <View style={styles.dateContainer}>
            <FAIcon
              name="calendar-alt"
              size={20}
              color="#ccc"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.eventDescription}>{formattedDateTime}</Text>
          </View>

          <Line
            width="85%"
            spaceVertical={25}
          />

          <Text style={styles.title}>Localização</Text>
          <Text style={styles.eventDescription}>{locationName}</Text>

          <Line
            width="85%"
            spaceVertical={25}
          />

          <Text style={styles.title}>Participantes</Text>
        </View>
        <FlatList
          data={this.props.eventData.participants}
          keyExtractor={item => item.uid}

          renderItem={
            ({ item, index }) => (
              <ContatoRow
                data={item}
                rowIndex={index}
              />
            )
          }
        />

      </NestedScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: height - 95
  },
  image: {
    width: '100%',
    height: 250,
  },
  title: {
    color: colors.whiteTitle,
    fontSize: sizes.title,
    fontFamily: fonts.primaryBold,
    marginBottom: 5
  },
  eventDescription: {
    color: "#6D6D6D"
  },
  infoSpacing: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30
  }
})
