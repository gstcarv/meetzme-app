import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import { Appbar } from 'react-native-paper';
import defaultStyles from '@/resources/defaultStyles'
import { StatusBar } from 'react-native' 

class BackBar extends Component {

  _goBack() {
    const { navigate, goBack } = this.props.navigation
    if (this.props.path) {
      navigate(this.props.path)
    } else {
      goBack()
    }
  }

  render() {
    return (
      <Appbar theme={{
        colors: {
          primary: this.props.color || "#fff",
        } 
      }}
        style={{
          elevation: this.props.noElevation ? 0 : 3,
          marginTop: StatusBar.currentHeight
        }}>
        <Appbar.BackAction
          onPress={this._goBack.bind(this)}
          color={defaultStyles.titleWhite.color}
        />
 
        {
          <Appbar.Content
            title={this.props.title}
          />
        }

      {
        this.props.rightButton &&
        <Appbar.Action icon={this.props.rightButton} onPress={this.props.onRightButtonPressed} 
              color={defaultStyles.titleWhite.color}/>
      }

      </Appbar>
    )
  }
}

export default withNavigation(BackBar);