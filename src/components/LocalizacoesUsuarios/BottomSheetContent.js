import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  FlatList
} from 'react-native'

import ContatoRow from "@/components/Contatos/ContatoRow"

import NestedScrollView from 'react-native-nested-scroll-view'

import {
  Line
} from '@/components/Forms'

import FAIcon from 'react-native-vector-icons/FontAwesome5'

import {
  Text,
} from 'react-native-paper'

import colors from '@/resources/colors'
import fonts from '@/resources/fonts'
import sizes from '@/resources/sizes'

const { height } = Dimensions.get('window')

import {
  inject,
  observer
} from 'mobx-react/native'

@inject('EventsStore')
@observer
export default class BottomSheetContent extends Component {

  state = {
    users: [
      {
        name: "Gustavo"
      }
    ]
  }

  getNestedScroll() {
    return this.NestedScrollView;
  }

  render() {

    let uri = "https://www.aussiespecialist.com/content/asp/en/sales-resources/image-and-video-galleries/_jcr_content/mainParsys/hero/image.adapt.1663.medium.jpg";

    return (
      <NestedScrollView style={styles.container}
        ref={ref => this.NestedScrollView = ref}>
        <View>
          <Image
            style={styles.image}
            source={{ uri }}
          />
        </View>
        <View style={styles.infoSpacing}>
          <Text style={styles.title}>Nome do Evento</Text>
          <Text style={styles.eventDescription}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi voluptatibus sequi ea deleniti repudiandae dolores dignissimos? Nobis nesciunt fugit soluta doloremque error, facilis iure, mollitia asperiores reprehenderit consequuntur quaerat incidunt?</Text>
          <View style={styles.dateContainer}>
            <FAIcon
              name="calendar-alt"
              size={20}
              color="#ccc"
              style={{marginRight: 8}}
            />
            <Text style={styles.eventDescription}>23/04/2002 22h40</Text>
          </View>

          <Line
            width="85%"
            spaceVertical={25}
          />

          <Text style={styles.title}>Localização</Text>
          <Text style={styles.eventDescription}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi voluptatibus sequi ea deleniti repudiandae dolores dignissimos? Nobis nesciunt fugit soluta doloremque error, facilis iure, mollitia asperiores reprehenderit consequuntur quaerat incidunt?</Text>

          <Line
            width="85%"
            spaceVertical={25}
          />

          <Text style={styles.title}>Participantes</Text>
        </View>
        <FlatList
          data={[
            {
              id: "1",
              name: "ajsdhkasd",
              username: "hjasdad",
              photoURL: uri
            },
            {
              id: "2",
              name: "ghj",
              username: "ghjghj",
              photoURL: uri
            },
            {
              id: "3",
              name: "fgd",
              username: "asdasd",
              photoURL: uri
            },
            {
              id: "4",
              name: "dghgh",
              username: "dfgdfg",
              photoURL: uri
            }
          ]}
          keyExtractor={item => item.id}

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
    marginTop: 15
  }
})
