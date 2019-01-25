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

import CadastroImageSelector from '@/components/CadastroImageSelector'

import defaultStyles from '@/resources/defaultStyles'

import firebase from 'react-native-firebase'

class Cadastro extends Component {

  constructor(){
    super();
    this.state = {
      username: "",
      image: null
    }
  }

  finalizaCadastro(){
    const { username, image } = this.state;
    const userInfo = this.props.navigation.getParam('userInfo');
    let newUser = {
      ...userInfo,
      username,
      image
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(userInfo.email, userInfo.password)
        .then(r => {
          console.log(r)
        })
        .catch(err => console.log(err))
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="#F5F5F5"
          animated />
        <BackButton color="#D8D8D8" />
        <ScrollView style={styles.formContainer}>
          <View>
            <Text style={defaultStyles.titleWhite}>Finalizar Cadastro</Text>
            <Text style={defaultStyles.subtitleWhite}>Selecione sua foto e digite seu nome de usuário</Text>
          </View>
          <View style={{ marginTop: 40 }}>
            <CadastroImageSelector 
                onSelectImage={(image) => this.setState({image})} />
            <TextField labelText="Nome de Usuário"
              placeholder="Insira seu Nome de Usuário"
              style={styles.field}
              maxLenght={25}
              onWrite={(username) => this.setState({username})} />
          </View>
          <Button background="#353F4B"
            textBold
            fullWidth
            color="white"
            style={{marginBottom: 20}}
            onPress={() => this.finalizaCadastro()}>Finalizar Cadastro</Button>
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
    marginBottom: 20,
    marginTop: 50
  }
})