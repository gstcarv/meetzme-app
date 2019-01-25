import React, { Component } from 'react'
import RippleView from 'react-native-material-ripple'
import FAIcon from 'react-native-vector-icons/FontAwesome5'
import { withNavigation } from 'react-navigation'

class Waves extends Component {
  render() {

    return (
      <RippleView 
        onPress={() => this.props.navigation.goBack()}
        style={{
              borderRadius: 100,
              overflow: "hidden",
              alignSelf: 'flex-start',
              padding: 10,
              position: 'absolute',
              left: 6,
              top: 6,
              ...this.props.style
          }}>
        <FAIcon name="arrow-left" 
                color={this.props.color || "#fff"} 
                size={this.props.size || 25} />
      </RippleView>
    )
  }
}

export default withNavigation(Waves);