import React, { Component } from 'react'
import { StyleSheet, View, BackHandler, Alert } from 'react-native'
import { Text } from 'react-native-paper'
import { withNavigation } from 'react-navigation'
import FAIcon from 'react-native-vector-icons/FontAwesome5'
import Permissions from 'react-native-permissions'

import Waves from '@/components/Waves'

import {
  Button
} from '@/components/Forms'

import colors from '@/resources/colors'
import fonts from '@/resources/fonts'

import LoggedUserStore from '@/store/LoggedUserStore';

class PermissaoLocalizacao extends Component {

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this._onBack);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this._onBack);
  }

  _onBack(){
    return true
  }

  async requestPermission(){
    let permission = await Permissions.check('location');

    if(permission != "authorized"){
      Permissions.request('location').then(response => {
        if(response == "authorized"){
          LoggedUserStore.getAndSendLocation()
          this.props.navigation.navigate("Logged");
        }
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Waves>
          <FAIcon 
            name="map-marker-alt"
            color="#fff"
            size={50}
          />
        </Waves>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Localização</Text>
          <Text style={styles.text}>Para utilizar o MeetzMe, precisamos da sua permissão!</Text>
        </View>
        <Button mode="contained"
            style={{ marginTop: 20 }}
            width={200}
            onPress={() => this.requestPermission()}>Começar</Button>
      </View>
    )
  }
}

export default withNavigation(PermissaoLocalizacao)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryDark,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textContainer: {
    paddingVertical: 30,
  },
  title: { 
    textAlign: 'center',
    color: 'white',
    fontFamily: fonts.primaryBold,
    fontSize: 25,
    marginVertical: 4
  },
  text: { 
    textAlign: 'center',
    color: 'white',
    fontSize: 15
  }
})
