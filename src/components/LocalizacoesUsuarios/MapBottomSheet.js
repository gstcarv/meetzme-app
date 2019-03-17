import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

import {
  BottomSheetBehavior,
  MergedAppBarLayout,
  FloatingActionButton
} from 'react-native-bottom-sheet-behavior'

import colors from '@/resources/colors'

import Icon from 'react-native-vector-icons/Ionicons'

import BottomSheetHeader from './BottomSheetHeader'
import BottomSheetContent from './BottomSheetContent'

export default class MapBottomSheet extends Component {

  constructor() {
    super()
    this.showingFAB = true;
  }

  componentDidMount() {
    this.bottomSheet.attachNestedScrollChild(this.sheetContent.getNestedScroll())
  }

  toggleFAB(e) {
    const { fab } = this
    let offset = e.nativeEvent.offset
    console.log(offset)
    if (offset >= 0.45) {
      if (this.showingFAB){
        fab.hide()
        this.showingFAB = false
      }
    } else {
      if (!this.showingFAB){
        fab.show()
        this.showingFAB = true
      }
    }
  }

  render() {
    return (
      <View>
        <BottomSheetBehavior
          // onSlide={this.toggleFAB.bind(this)}
          peekHeight={70}
          hideable={false}
          ref={ref => this.bottomSheet = ref}
          state={BottomSheetBehavior.STATE_EXPANDED}>
          <View style={{ backgroundColor: colors.primaryDark }}>
            <BottomSheetHeader />
            <BottomSheetContent ref={ref => this.sheetContent = ref} />
          </View>
        </BottomSheetBehavior>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  appBarMerged: {
    transform: [
      {
        translateY: -24,
      }
    ],
    height: 72,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
