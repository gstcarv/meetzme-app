import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  Image,
  Alert,
  ScrollView,
  AsyncStorage,
} from 'react-native'

import Waves from '@/components/Waves'

import {
  TextField,
  Line,
  Button
} from '@/components/Forms'

import BackButton from '@/components/BackButton'
import Snackbar from 'react-native-snackbar'
import firebase from 'react-native-firebase'

import colors from "@/resources/colors"
import fonts from "@/resources/fonts"

export default class Login extends Component {

  constructor() {
    super();
    this.unsubscribe = null;
    this.state = {
      email: "",
      password: "",
      loading: false
    }
  }

  async signIn() {
    const email = this.state.email || "gueti2010@gmail.com"
    const password = this.state.password || "pai152123"

    this.setState({
      loading: true
    })

    /*

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
    
    */
  }

  onFocusInput(){
    this.loginScrollView.scrollToEnd({
      // animated: true
    })
    console.warn('scroll')
  }

  render() {
    return (
      <ScrollView style={styles.scrollView}
        keyboardShouldPersistTaps='always'
        ref={ ref => this.loginScrollView = ref }>
        <StatusBar backgroundColor={colors.primaryDark} />
        <View style={styles.header}>
          <BackButton path="Principal" />
          <Waves>
            <Image source={require("@assets/images/app-logo.png")}
              style={{ width: 50, height: 50 }}></Image>
          </Waves>
        </View>
        <View style={styles.loginForm}>
          <TextField label="Email"
            placeholder="Digite seu email"
            style={{ marginBottom: 5 }}
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            onFocus={() => this.onFocusInput()} />

          <TextField label="Senha"
            placeholder="Digite sua senha"
            style={{ marginBottom: 20 }}
            secureTextEntry
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            onFocus={() => this.onFocusInput()} />

          <Button mode="contained"
                  onPress={() => this.signIn()}
                  loading={this.state.loading}
                  disabled={this.state.loading}>Login</Button>
        
          <Button style={styles.forgotPasswordButton}
                  fontSize={12}
                  color="#353F4B"
                  uppercase={false}
                  onPress={() => console.log("ok")}>Esquecí a senha</Button>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#fff",
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
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  forgotPasswordButton: {
    alignSelf: "center",
    marginTop: 5
  }
})
