import React, { Component } from 'react'
import { 
  Text, 
  StyleSheet, 
  View,
  ImageBackground,
  StatusBar,
  Image
} from 'react-native'

import { withNavigation } from 'react-navigation'

import colors from "@/resources/colors"
import fonts from "@/resources/fonts"

import { Button } from '@/components/forms'

class Principal extends Component {
  render() {

    const { navigate } = this.props.navigation;

    return (
      <ImageBackground style={styles.container}
                       source={require("@assets/images/main-background.jpg")}>
        <StatusBar backgroundColor={colors.primaryDark} 
                   animated />
        <View style={{alignItems: 'center'}}>
          <Image source={require("@assets/images/app-logo.png")}
                 style={{ width: 170, height: 170 }}></Image>
          <Text style={styles.appTitle}>MeetzMe</Text>
        </View>
        <View style={{marginTop: 30}}>
          <Button
                outline
                rounded
                width={250}
                color={"#fff"}
                style={{marginBottom: 10}}
                onPress={() => navigate("Login")}>Login</Button>
          <Button
                rounded
                width={250}
                color={"#353F4B"}
                onPress={() => navigate("Cadastro")}>Cadastre-se</Button>
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 60,
  },
  appTitle: {
    textAlign: 'center',
    color: "#fff",
    fontFamily: fonts.primaryBold,
    fontSize: 25,
    letterSpacing: 15
  }
})

export default withNavigation(Principal)