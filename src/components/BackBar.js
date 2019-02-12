import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import { Appbar } from 'react-native-paper';
import defaultStyles from '@/resources/defaultStyles'

class Waves extends Component {

  _goBack(){
    const { navigate, goBack } = this.props.navigation
    if(this.props.path){
      navigate(this.props.path)
    } else {
      goBack()
    }
  }

  render() {
    return (
      <Appbar theme={{
        colors: {
          primary: "#fff",
        }
      }}
        style={{
          elevation: 3
        }}>
        <Appbar.BackAction
          onPress={this._goBack}
          color={defaultStyles.titleWhite.color}
        />
      </Appbar>
    )
  }
}

export default withNavigation(Waves);