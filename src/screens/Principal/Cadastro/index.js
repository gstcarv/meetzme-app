import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  ScrollView,
} from 'react-native'

import ReactNative from 'react-native'

import InputScrollView from 'react-native-input-scroll-view';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {
  withNavigation
} from 'react-navigation'

import BackButton from '@/components/BackButton'

import {
  Button,
  TextField,
  Line
} from '@/components/Forms'

import defaultStyles from '@/resources/defaultStyles'
import BackBar from '../../../components/BackBar';

class Cadastro extends Component {

  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      phone: "",
      password: "",
      passwordConfirm: ""
    }
  }

  validaCadastro() {
    this.props.navigation.navigate("FinalizaCadastro", {
      userInfo: this.state
    });
  }

  gotoNextInput(fieldName) {
    const ref = this.refs[fieldName];
    this.refs[fieldName].focus()
    this.cadastroScroll.props.scrollToFocusedInput(ReactNative.findNodeHandle(ref))
  }

  onFocusField(field) {
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="#F5F5F5"
          barStyle="dark-content"
          animated />

        <BackBar />

        <KeyboardAwareScrollView
          innerRef={ref => {
            this.cadastroScroll = ref
          }}>

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
              ref="nameField"
              onGoNext={() => this.gotoNextInput("emailField")}
            />

            <TextField label="Email"
              placeholder="Digite seu Email"
              style={styles.field}
              type="email-address"
              maxLenght={40}
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
              ref="emailField"
              onGoNext={() => this.gotoNextInput("telField")}
            />

            <TextField label="Telefone"
              placeholder="Digite seu Telefone"
              type="phone-pad"
              maxLenght={20}
              value={this.state.phone}
              onChangeText={phone => this.setState({ phone })}
              ref="telField"
              onGoNext={() => this.gotoNextInput("passField")}
            />

            <Line spaceVertical={40}></Line>

            <TextField label="Senha"
              placeholder="Digite sua senha"
              secureTextEntry
              style={styles.field}
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
              ref="passField"
              onGoNext={() => this.gotoNextInput("confirmPassField")}
            />

            <TextField label="Confirmação de senha"
              placeholder="Digite sua senha novamente"
              secureTextEntry
              style={styles.field}
              value={this.state.passwordConfirm}
              onChangeText={passwordConfirm => this.setState({ passwordConfirm })}
              ref="confirmPassField"
            />
          </View>

          <Button mode="contained"
                noRadius
              onPress={() => this.validaCadastro()}>Próximo</Button>
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
