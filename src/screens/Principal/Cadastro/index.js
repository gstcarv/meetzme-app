import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
} from 'react-native'

import ReactNative from 'react-native'

import firebase from 'react-native-firebase'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {
  withNavigation
} from 'react-navigation'

import {
  Button,
  TextField,
  Line
} from '@/components/Forms'

import defaultStyles from '@/resources/defaultStyles'
import BackBar from '@/components/BackBar';

class Cadastro extends Component {

  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      errors: {
        name: null,
        email: null,
        password: null,
        passwordConfirm: null
      },
      loading: false
    }
  }

  async validaCadastro() {
    // Função para editar o state com o erro
    const setError = (field, text) => {
      this.setState({
        errors: {
          [field]: text
        }
      })
    }

    const { name, email, password, passwordConfirm } = this.state

    // Limpa os erros
    this.setState({
      errors: {
        name: null,
        email: null,
        password: null,
        passwordConfirm: null
      }
    })

    if (name.length < 4) {
      setError('name', "O nome deve ter no mínimo 4 caracteres")
      this.scrollToField('nameRef')
    } else if (email.length < 8 || !email.includes('@') || !email.includes('.')) {
      setError('email', "Digite o email corretamente. Exemplo: pessoa@email.com")
      this.scrollToField('emailRef')
    } else if (password.length < 8) {
      setError('password', "A senha deve ter no mínimo 8 caracteres")
      this.scrollToField('passwordRef')
    } else if (passwordConfirm != password) {
      setError('passwordConfirm', "As senhas não coincidem")
      this.scrollToField('confirmPasswordRef')
    } else {
      this.setState({ loading: true })

      // Vê se o email ja está cadastrado
      let searchForEmail = await firebase.firestore()
        .collection('users')
        .where('email', '==', email)
        .limit(1)
        .get();

      this.setState({ loading: false })

      if(searchForEmail.size == 0){
        this.props.navigation.navigate("FinalizaCadastro", {
          userInfo: {
            name,
            email,
            password
          }
        });
      } else {
        setError('email', "O email ja está cadastrado")
        this.scrollToField('emailRef')
      }
    }
  }

  scrollToField(refName) {
    this[refName].focus()
    this.cadastroScroll.props.scrollToFocusedInput((ReactNative.findNodeHandle(this[refName])))
  }

  render() {

    const { errors } = this.state

    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="#F5F5F5"
          barStyle="dark-content"
          translucent
          animated 
        />

        <BackBar />

        <KeyboardAwareScrollView
          innerRef={ref => {
            this.cadastroScroll = ref
          }}
          keyboardShouldPersistTaps='always'>

          <View style={{
            paddingHorizontal: 20,
            marginTop: 20
          }}>
            <Text style={defaultStyles.titleWhite}>Cadastro</Text>
            <Text style={defaultStyles.subtitleWhite}>Insira suas informações nos campos abaixo</Text>
          </View>

          <View style={styles.formContainer}>
            <TextField label="Nome"
              placeholder="Digite seu Nome"
              style={styles.field}
              value={this.state.name}
              onChangeText={name => this.setState({ name })}
              error={errors.name}
              returnKeyType="next"
              maxLength={25}
              autoCapitalize="words"
              ref={ref => this.nameRef = ref}
              onEndType={() => this.scrollToField("emailRef")}
            />

            <TextField label="Email"
              placeholder="Digite seu Email"
              style={styles.field}
              type="email-address"
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
              error={errors.email}
              returnKeyType="next"
              maxLength={254}
              autoCapitalize="none"
              ref={ref => this.emailRef = ref}
              onEndType={() => this.scrollToField("passwordRef")}
            />

            <Line spaceVertical={40}></Line>

            <TextField label="Senha"
              placeholder="Digite sua senha"
              secureTextEntry
              style={styles.field}
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
              error={errors.password}
              returnKeyType="next"
              maxLength={500}
              ref={ref => this.passwordRef = ref}
              onEndType={() => this.scrollToField("confirmPasswordRef")}
            />

            <TextField label="Confirmação de senha"
              placeholder="Digite sua senha novamente"
              secureTextEntry
              style={styles.field}
              value={this.state.passwordConfirm}
              error={errors.passwordConfirm}
              returnKeyType="next"
              maxLength={500}
              ref={ref => this.confirmPasswordRef = ref}
              onChangeText={passwordConfirm => this.setState({ passwordConfirm })}
              onEndType={() => this.validaCadastro()}
            />

            <Button mode="contained"
              noRadius
              icon="keyboard-arrow-right"
              onPress={() => this.validaCadastro()}
              loading={this.state.loading}>Próximo</Button>

          </View>

        </KeyboardAwareScrollView>
      </View>
    )
  }
}

export default withNavigation(Cadastro);

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 20,
    flex: 1,
    marginBottom: 20,
    marginTop: 20
  },
  field: {
    marginBottom: 7
  }
})
