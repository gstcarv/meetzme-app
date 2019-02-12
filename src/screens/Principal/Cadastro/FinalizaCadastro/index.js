import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  ScrollView,
  Alert
} from 'react-native'

import {
  withNavigation
} from 'react-navigation'

import BackButton from '@/components/BackButton'

import {
  Button,
  TextField,
  Line
} from '@/components/Forms'

import UserImageSelector from '@/components/UserImageSelector'

import defaultStyles from '@/resources/defaultStyles'

import firebase from 'react-native-firebase'
import BackBar from '../../../../components/BackBar';

class Cadastro extends Component {

  constructor() {
    super();
    this.state = {
      username: "",
      image: null,
      loading: false
    }
  }

  finalizaCadastro() {

    this.setState({
      loading: true
    })

    return ;

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
        .then(async res => {

          const { user } = res;

          try {

            let downloadURL = null

            if(this.state.image){
              const userProfileImageRef = firebase.storage().ref('profile').child(user.uid)
              var fileUpload = await userProfileImageRef.putFile(image.path, {
                contentType: image.mime
              })
    
              downloadURL = fileUpload.downloadURL;
            }
          
            const firestoreRef = firebase.firestore();
  
            firestoreRef.collection('users').doc(user.uid).set({
              name: newUser.name,
              phone: newUser.phone,
              username: newUser.username,
              photoURL: downloadURL
            })
  
            return res.user.updateProfile(
              {
                displayName: newUser.name,
                photoURL: downloadURL
              }
            ).then(() => this.props.navigation.navigate('Login'));
          } catch (error) {
            // console.log(error)
          }

        })
        .catch(err => {
          Alert.alert("Erro", "Ocorreu um erro, tente novamente mais tarde");
          this.setState({
            loading: false
          })
        })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="#F5F5F5"
          animated />
        <BackBar />
        <ScrollView style={styles.formContainer}>
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
              maxLenght={25}
              value={this.state.username}
              onChangeText={(username) => this.setState({ username })} />
          </View>
          <Button
            icon="check"
            mode="contained"
            style={{ marginBottom: 20 }}
            loading={this.state.loading}
            disabled={this.state.loading}
            onPress={() => this.finalizaCadastro()}>Finalizar Cadastro</Button>
        </ScrollView>
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
    marginBottom: 20,
    marginTop: 50
  }
})