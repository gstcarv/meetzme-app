import React, { Component } from 'react'
import {
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
  StyleSheet
} from 'react-native'

import { withNavigation } from 'react-navigation'

class BottomTabButton extends Component {
  render() {

    const { navigation, path } = this.props;

    return (
      <TouchableNativeFeedback onPress={() => navigation.navigate(path)}>
          <View style={styles.tabButton}>
            { this.props.children }
          </View>
      </TouchableNativeFeedback>
    )
  }
}

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 75
  }
})

export default withNavigation(BottomTabButton);
