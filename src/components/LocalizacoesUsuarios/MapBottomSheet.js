import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  BackHandler
} from 'react-native'

import {
  BottomSheetBehavior,
  MergedAppBarLayout,
  FloatingActionButton
} from 'react-native-bottom-sheet-behavior'

import colors from '@/resources/colors'

import Icon from 'react-native-vector-icons/MaterialIcons'

import BottomSheetHeader from './BottomSheetHeader'
import BottomSheetContent from './BottomSheetContent'

import { withNavigation } from 'react-navigation'

class MapBottomSheet extends Component {

  constructor() {
    super()
    this.state = {
      BottomSheetState: 4
    }
  }

  componentDidMount() {
    this.bottomSheet.attachNestedScrollChild(this.sheetContent.getNestedScroll())
    BackHandler.addEventListener('hardwareBackPress', () => {
      if (this.state.BottomSheetState == 3) {
        this.bottomSheet.setBottomSheetState(4)
        return true;
      }
    })
  }

  _onMenuIconPress() {
    if (this.state.BottomSheetState == 3) {
      this.bottomSheet.setBottomSheetState(4)
    } else if (this.state.BottomSheetState == 4) {
      this.bottomSheet.setBottomSheetState(3)
    }
  }

  _onBottomSheetonReturnButtonPress() {
    if (this.state.BottomSheetState == 3) {
      this.bottomSheet.setBottomSheetState(4)
    } else if (this.state.BottomSheetState == 4) {
      this.props.navigation.goBack()
    }
  }

  render() {
    return (
      <View>
        <BottomSheetBehavior
          onStateChange={(e) => {
            if (this.props.onStateChange) this.props.onStateChange(e.nativeEvent.state)
            this.setState({ BottomSheetState: e.nativeEvent.state })
          }}
          peekHeight={70}
          hideable={false}
          anchorEnabled={false}
          ref={ref => this.bottomSheet = ref}
          state={BottomSheetBehavior.STATE_COLLAPSED}>
          <View style={{ backgroundColor: colors.primaryDark }}>
            <BottomSheetHeader
              onMenuIconPress={this._onMenuIconPress.bind(this)}
              onReturnButtonPress={this._onBottomSheetonReturnButtonPress.bind(this)}
            />
            <BottomSheetContent
              ref={ref => this.sheetContent = ref}
              eventData={this.props.eventData}
            />
          </View>
        </BottomSheetBehavior>
      </View>
    )
  }
}

export default withNavigation(MapBottomSheet)

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
