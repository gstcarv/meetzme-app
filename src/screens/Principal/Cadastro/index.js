import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  ScrollView
} from 'react-native'

import {
  withNavigation
} from 'react-navigation'

import BackButton from '@/components/BackButton'

import {
  Button,
  TextField,
  Line
} from '@/components/forms'

import defaultStyles from '@/resources/defaultStyles'

class Cadastro extends Component {

  constructor(){
    super();
    this.state = {
      name: "",
      email: "",
      phone: "",
      password: "",
      passwordConfirm: ""
    }
  }

  validaCadastro(){
    this.props.navigation.navigate("FinalizaCadastro", {
      userInfo: this.state
    });
  }

  gotoNextInput(fieldName){
    this.refs[fieldName].focus()
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="#F5F5F5"
          animated />
        <BackButton color="#D8D8D8" />
        <ScrollView style={styles.formContainer}>
          <View>
            <Text style={defaultStyles.titleWhite}>Cadastro</Text>
            <Text style={defaultStyles.subtitleWhite}>Insira suas informações nos campos abaixo</Text>
          </View>
          <View style={{ marginTop: 40 }}>
            <TextField labelText="Nome"
              placeholder="Digite seu Nome"
              style={styles.field}
              maxLenght={25}
              onWrite={(name) => this.setState({name})}
              ref="nameField"
              onGoNext={ () => this.gotoNextInput("emailField") }
              />

            <TextField labelText="Email"
              placeholder="Digite seu Email"
              style={styles.field}
              type="email-address"
              maxLenght={40}
              onWrite={(email) => this.setState({email})}
              ref="emailField"
              onGoNext={ () => this.gotoNextInput("telField") }
              />

            <TextField labelText="Telefone"
              placeholder="Digite seu Telefone"
              type="phone-pad"
              maxLenght={20}
              onWrite={(phone) => this.setState({phone})}
              ref="telField"
              onGoNext={ () => this.gotoNextInput("passField") }
            />

            <Line spaceVertical={40}></Line>

            <TextField labelText="Senha"
              placeholder="Digite sua senha"
              password
              style={styles.field}
              onWrite={password => this.setState({password})}
              ref="passField"
              onGoNext={ () => this.gotoNextInput("confirmPassField")}
            />

            <TextField labelText="Confirmação de senha"
              placeholder="Digite sua senha novamente"
              password
              style={styles.field}
              onWrite={passwordConfirm => this.setState({passwordConfirm})}
              ref="confirmPassField"
            />

          </View>
          <Button background="#353F4B"
            textBold
            fullWidth
            color="white"
            onPress={() => this.validaCadastro()}
            style={{marginBottom: 20}}>Próximo</Button>
        </ScrollView>
      </View>
    )
  }
}

export default withNavigation(Cadastro);

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 30,
    flex: 1,
    marginTop: 60
  },
  field: {
    marginBottom: 20
  }
})
