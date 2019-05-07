import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  Alert
} from 'react-native'

import ReactNative from 'react-native'

import {
  withNavigation
} from 'react-navigation'

import debounce from 'debounce'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {
  Button,
  TextField,
  Line
} from '@/components/Forms'

import UserImageSelector from '@/components/UserImageSelector'

import defaultStyles from '@/resources/defaultStyles'

import firebase from 'react-native-firebase'
import BackBar from '@/components/BackBar';

class Cadastro extends Component {

  constructor() {
    super();
    this.state = {
      username: "",
      image: null,
      loading: false,
      isUsernameValid: null,
      errors: {
        username: null
      }
    }
  }

  focusUsername(){
    this['usernameRef'].focus()
    this.cadastroScroll.props.scrollToFocusedInput((ReactNative.findNodeHandle(this['usernameRef'])))
  }

  async finalizaCadastro() {

    const { username, image } = this.state;

    this.setState({
      username: username.toLowerCase()
    })

    this.setState({
      errors: { username: null }
    })

    let regex = new RegExp("^[a-zA-Z0-9._-]*$");

    // Valida Campos
    if(image == null){
      Alert.alert("Foto", "Selecione a foto do seu perfil");
    } else if (username.length < 3){
      this.setState({
        errors: {
          username: "O nome de usuário deve ter pelo menos 3 caracteres"
        }
      })
      this.focusUsername()
    } else if (!regex.test(username)){
      this.setState({
        errors: {
          username: 'Não são permitidos caracteres especiais, com exceção de ".", "_" e "-"'
        }
      })
      this.focusUsername()
    } else {

      this.setState({
        loading: true
      })

      // Verifica se o username ja está em uso
      let searchForUsername = await firebase.firestore()
        .collection('users')
        .where('username', '==', username)
        .limit(1)
        .get();
      
      if(searchForUsername.size > 0){
        this.setState({
          errors: {
            username: 'Esse nome de usuário ja está em uso'
          },
          loading: false
        })
        this.focusUsername()
      } else {

        // Cria a conta

        const userInfo = this.props.navigation.getParam('userInfo');

        let newUser = {
          ...userInfo,
          username,
          image
        }
    
        firebase
          .auth()
          .createUserWithEmailAndPassword(userInfo.email, userInfo.password)
          .then(async res => {
    
            const { user } = res;
    
            try {
    
              let downloadURL = null
    
              if (this.state.image) {
                const userProfileImageRef = firebase.storage().ref('profile').child(user.uid)
                var fileUpload = await userProfileImageRef.putFile(image.path, {
                  contentType: image.mime
                })
    
                downloadURL = fileUpload.downloadURL;
              }
    
              const firestoreRef = firebase.firestore();
    
              firestoreRef.collection('users').doc(user.uid).set({
                name: newUser.name,
                username: newUser.username,
                email: newUser.email,
                photoURL: downloadURL
              })
    
              return res.user.updateProfile(
                {
                  displayName: newUser.name,
                  photoURL: downloadURL
                }
              ).then(async () => {
                await firebase.auth().signInWithEmailAndPassword(newUser.email, newUser.password);
                this.props.navigation.navigate("Loading")
              });
            } catch (error) { }
          })
          .catch(err => {
            Alert.alert("Erro", "Ocorreu um erro, tente novamente mais tarde");
            this.setState({
              loading: false
            })
          })
      }
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar 
          backgroundColor="#F5F5F5"
          animated
          barStyle="dark-content"
        />
        <BackBar />
        <KeyboardAwareScrollView 
          innerRef={ref => {
            this.cadastroScroll = ref
          }}
          style={styles.formContainer}
          keyboardShouldPersistTaps='always'>
          <View>
            <Text style={defaultStyles.titleWhite}>Finalizar Cadastro</Text>
            <Text style={defaultStyles.subtitleWhite}>Selecione sua foto e digite seu nome de usuário</Text>
          </View>
          <View style={{ marginTop: 40 }}>
            <UserImageSelector
              onSelectImage={(image) => this.setState({ image })} />
            <TextField label="Nome de Usuário"
              placeholder="Insira seu Nome de Usuário"
              style={styles.field}
              maxLength={25}
              autoCapitalize="none"
              value={this.state.username}
              error={this.state.errors.username}
              onChangeText={(username) => { this.setState({ username }) }}
              ref={ref => this.usernameRef = ref}
              onEndType={() => this.finalizaCadastro()}
            />
          </View>
          <Button
            icon="check"
            mode="contained"
            style={{ 
              marginVertical: 20
            }}
            loading={this.state.loading}
            disabled={this.state.loading}
            onPress={() => this.finalizaCadastro()}>Finalizar Cadastro</Button>
          <Line />
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
    paddingTop: 20
  },
  field: {
    marginTop: 50
  }
})