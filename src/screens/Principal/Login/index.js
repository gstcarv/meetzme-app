import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  Image,
  Alert,
  ScrollView,
  AsyncStorage
} from 'react-native'

import Waves from '@/components/Waves'

import {
  Button,
  TextField,
  Line
} from '@/components/Forms'

import BackButton from '@/components/BackButton'
import Snackbar from 'react-native-snackbar'
import firebase from 'react-native-firebase'

import colors from "@/resources/colors"
import fonts from "@/resources/fonts"

export default class Login extends Component {

  constructor(){
    super();
    this.unsubscribe = null;
    this.state = {
      email: "",
      password: "",
      loading: false
    }
  }

  async signIn(){
    const email = this.state.email || "gueti2010@gmail.com"
    const password = this.state.password || "pai152123"

    this.setState({
      loading: true
    })

    try {
      const user = await firebase.auth()
          .signInWithEmailAndPassword(email, password)
    } catch (err) {
      Snackbar.show({
        title: 'Login ou Senha incorretos',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#b71b25'
      })
    }

    this.setState({
      loading: false
    })

  }

  render() {
    return (
      <ScrollView style={styles.container} 
          keyboardShouldPersistTaps='always'>
        <StatusBar backgroundColor={colors.primaryDark} />
        <View style={styles.header}>
          <BackButton path="Principal"/>
          <Waves>
            <Image source={require("@assets/images/app-logo.png")}
                   style={{width: 50, height: 50}}></Image>
          </Waves>
        </View>
        <View style={styles.loginForm}>
          <TextField labelText="Email"
            placeholder="Digite seu email"
            style={{ marginBottom: 30 }}
            type="email-address"
            onWrite={(email) => this.setState({email})} />

          <TextField labelText="Senha"
            placeholder="Digite sua senha"
            password
            style={{ marginBottom: 40 }}
            onWrite={(password) => this.setState({password})} />

          <Button background="#353F4B"
                  color="#fff"
                  textBold
                  fullWidth
                  onPress={() => this.signIn()}
                  style={{marginBottom: 4}}
                  loading={this.state.loading}>Login</Button>

          <Button style={styles.forgotPasswordButton}
                  fontSize={12}
                  color="#353F4B">Esquecí a senha</Button>
        </View>
      </ScrollView>
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
    height: 250,
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10
  },
  loginTitle: {
    bottom: 0,
    marginBottom: 10,
    marginTop: 10,
    fontSize: 25,
    color: "white",
    fontFamily: fonts.primaryBold,
  },
  loginForm: {
    flex: 1,
    paddingHorizontal: 30,
    marginTop: 40
  },
  forgotPasswordButton: {
    alignSelf: "center"
  }
})
