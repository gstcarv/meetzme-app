import React, { Component } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

import { Text } from 'react-native-paper'

import CircleThumbnail from './EventCircleSlider/CircleThumbnail'

export default class EventCircleSlider extends Component {
  render() {

    let emptyCircles = []

    if(this.props.data.length <= 4){
      for(i = this.props.data.length; i <= 4; i++){
        emptyCircles.push(<CircleThumbnail empty key={i}/>)
      }
    }

    return (
      <View style={{ marginBottom: 25 }}>
        <Text style={styles.barTitle}>{this.props.title}</Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContainer}>

          {
            this.props.data.map((event, index) => {
              if (index <= this.props.limit - 1) {
                return <CircleThumbnail image={event.imageURL} key={index}/>
              }
            })
          }

          { emptyCircles.map(c => c) }

        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  barTitle: {
    color: "#D8D8D8",
    fontSize: 15,
    marginLeft: 10,
    marginBottom: 15
  },
  scrollViewContainer: {
    paddingStart: 6,
    paddingEnd: 6
  }
})
