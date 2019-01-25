import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  StatusBar,
  Image
} from 'react-native'

import Waves from '@/components/Waves'

import {
  Button,
  TextField,
  Line
} from '@/components/forms'

import Icon from 'react-native-vector-icons/FontAwesome'

import colors from "@/resources/colors"
import fonts from "@/resources/fonts"

export default class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.primaryDark} />
        <View style={styles.header}>
          <Waves>
            <Image source={require("@assets/images/app-logo.png")}
                   style={{width: 70, height: 70}}></Image>
          </Waves>
          <Text style={styles.loginTitle}>LOGIN</Text>
        </View>
        <View style={styles.loginForm}>
          <TextField labelText="Email"
            placeholder="Digite seu email"
            autoFocus
            style={{ marginBottom: 30 }}
            type="email-address" />

          <TextField labelText="Senha"
            placeholder="Digite sua senha"
            password
            style={{ marginBottom: 40 }} />

          <Button background="#353F4B"
                  color="#fff"
                  textBold
                  fullWidth>Login</Button>
          <Line spaceVertical={30}></Line>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  header: {
    backgroundColor: "#343D49",
    height: "45%",
    justifyContent: "center",
    alignItems: "center"
  },
  loginTitle: {
    fontSize: 25,
    color: "white",
    fontFamily: fonts.primaryBold,
  },
  loginForm: {
    flex: 1,
    paddingHorizontal: 30,
    marginTop: 40
  }
})
