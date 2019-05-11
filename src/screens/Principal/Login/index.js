import React, { Component } from 'react'
import ReactNative, {
  StyleSheet,
  View,
  StatusBar,
  Image,
} from 'react-native'

import Waves from '@/components/Waves'

import {
  withNavigation,
} from 'react-navigation'

import {
  TextField,
  Button
} from '@/components/Forms'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import BackButton from '@/components/BackButton'
import Snackbar from 'react-native-snackbar'
import firebase from 'react-native-firebase'

import colors from "@/resources/colors"
import fonts from "@/resources/fonts"

class Login extends Component {

  constructor() {
    super();
    this.unsubscribe = null;
    this.state = {
      email: "",
      password: "",
      loading: false,
      errors: {}
    }
  }

  async signIn() {

    const { email, password } = this.state;

    this.setState({
      errors: {}
    })

    if (!email.includes("@") || !email.includes(".") || email.length < 4) {
      this.setState({
        errors: {
          email: "Digite o email corretamente. Exemplo: pessoa@email.com"
        }
      })
    } else if (password.length == 0) {
      this.setState({
        errors: {
          password: "Digite a senha"
        }
      })
    } else {
      this.setState({
        loading: true
      })

      try {
        await firebase.auth()
          .signInWithEmailAndPassword(email, password)
        this.setState({
          loading: false
        })
        this.props.navigation.navigate("Loading");
      } catch (err) {
        this.setState({
          loading: false
        })
        Snackbar.show({
          title: 'Login ou Senha incorretos',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: '#b71b25'
        })
      }
    }
  }

  scrollToInput(refName){
    this[refName].focus()
    this.loginScrollView.props.scrollToFocusedInput(ReactNative.findNodeHandle(this[refName]))
  }

  render() {

    const { errors } = this.state;

    return (
      <KeyboardAwareScrollView style={styles.scrollView}
        keyboardShouldPersistTaps='always'
        innerRef={ref => this.loginScrollView = ref}>
        <StatusBar backgroundColor={colors.primaryDark} />
        <View style={styles.header}>
          <BackButton path="Principal" />
          <Waves>
            <Image source={require("@assets/images/logo_gray.png")}
              style={{ width: 90, height: 90 }}></Image>
          </Waves>
        </View>
        <View style={styles.loginForm}>
          <TextField label="Email"
            placeholder="Digite seu email"
            value={this.state.email}
            error={errors.email}
            onChangeText={email => this.setState({ email })}
            autoCapitalize="none"
            ref={ref => this.emailRef = ref}
            returnKeyType="next"
            onFocus={() => this.scrollToInput("emailRef")}
            onEndType={() => this.scrollToInput("passwordRef")} />

          <TextField label="Senha"
            placeholder="Digite sua senha"
            secureTextEntry
            error={errors.password}
            style={{ marginTop: 10 }}
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            ref={ref => this.passwordRef = ref}
            onFocus={() => this.scrollToInput("passwordRef")}
            onEndType={() => this.signIn()}
          />

          <Button mode="contained"
            style={{ marginTop: 20 }}
            onPress={() => this.signIn()}
            loading={this.state.loading}
            disabled={this.state.loading}>Login</Button>

          <Button style={styles.forgotPasswordButton}
            fontSize={12}
            color="#353F4B"
            uppercase={false}
            rounded
            onPress={() => console.warn("ok")}>Esquecí a senha</Button>
        </View>
      </KeyboardAwareScrollView>
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
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  forgotPasswordButton: {
    alignSelf: "center",
    marginTop: 5
  }
})

export default withNavigation(Login)