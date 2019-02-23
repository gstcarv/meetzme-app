import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  StatusBar,
  ScrollView,
  FlatList,
  Animated,
  Easing,
} from 'react-native'

import {
  Text,
  FAB
} from 'react-native-paper'

import Snackbar from 'react-native-snackbar'

import { withNavigation } from 'react-navigation'

import firebase from 'react-native-firebase'

import LoadingModal from '@/components/NovoEvento/LoadingModal'
import BackBar from '@/components/BackBar'
import ConvidadosSearchField from '@/components/NovoEvento/ConvidadosSearchField'
import ConvidadosListRow from '@/components/NovoEvento/ConvidadosListRow'
import defaultStyles from '@/resources/defaultStyles'

import store from '@/store'

class SelecionarConvidados extends Component {

  constructor() {
    super()
    this.state = {
      allContatos: store.contactsData,
      searchContacts: store.contactsData,
      convidados: [],
      fabVisible: false,
      loading: false
    }

    this.fabButtonTranslate = new Animated.Value(100)

  }
  
  search(text) {
    let contacts = store.contactsData
    let searchContacts = contacts.filter(contact => {
      let name = contact.name.toLowerCase(),
          username = contact.username.toLowerCase(),
          searchText = text.toLowerCase()

      return name.includes(searchText) 
        || username.includes(searchText)
    })
    this.setState({ searchContacts })
  }

  toggleFAB(convidados) {
    const { fabVisible } = this.state;
    if (convidados.length > 0) {
      if (fabVisible == false) {
        Animated.spring(this.fabButtonTranslate, {
          toValue: 0,
          duration: 1000,
          bounciness: 20,
          useNativeDriver: true
        }).start()
        this.setState({
          fabVisible: true
        })
      }
    } else {
      Animated.timing(this.fabButtonTranslate, {
        toValue: 100,
        duration: 300,
        useNativeDriver: true,
        Easing: Easing.ease,
      }).start()
      this.setState({
        fabVisible: false
      })
    }
  }

  _onToggleUserSelect(id) {
    const { convidados } = this.state
    let newConvidados;
    if (convidados.includes(id)) {
      newConvidados = convidados.filter(uid => uid != id)
      this.setState({ convidados: newConvidados })
    } else {
      newConvidados = [
        ...convidados,
        id
      ]
      this.setState({
        convidados: newConvidados
      })
    }
    this.toggleFAB(newConvidados)
  }

  async createEvent() {
    const { navigation } = this.props
    const eventsRef = firebase.firestore().collection('events')

    if (this.state.convidados.length == 0) {
      return
    }

    this.setState({ loading: true })

    try {
      const {
        title,
        description,
        eventDateTime,
        destination,
        image,
        transport,
        locationName
      } = navigation.getParam('infoEvento')

      const adminID = store.loggedUserInfo.uid

      const newEventRef = eventsRef.doc(),
        eventImageRef = firebase.storage().ref('events').child(newEventRef.id)

      var fileUpload = await eventImageRef.putFile(image.path, {
        contentType: image.mime
      })

      let imageURL = fileUpload.downloadURL;

      await newEventRef.set({
        adminID,
        title,
        description,
        datetime: eventDateTime,
        locationName,
        destination,
        participants: [adminID],
        invitedUsers: this.state.convidados,
        imageURL
      })

      await firebase.firestore()
        .collection('users')
        .doc(adminID)
        .collection('acceptedEvents')
        .doc(newEventRef.id)
        .set({
          acceptedAt: Date.now(),
          transportMode: transport
        })

      this.setState({ loading: false })
      navigation.navigate('Home')
    }
    catch (e) {
      Snackbar.show({
        title: 'Ocorreu um erro, tente novamente mais tarde',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: '#b71b25'
      })
      this.setState({ loading: false })
    }
  }

  render() {

    let numContatos = this.state.allContatos.length;

    console.log("RENDER => ", store.contactsData)
    console.log("STATE IN RENDER => ", this.state.allContatos)
    
    return (
      <View style={{flex: 1}}>
        <StatusBar backgroundColor="#F5F5F5"
          barStyle="dark-content"
          animated />

        <BackBar />

        <ScrollView style={{ paddingBottom: 55 }}>
          <View style={{
            paddingHorizontal: 20,
            marginTop: 20,
            marginBottom: 20
          }}>
            <Text style={defaultStyles.titleWhite}>Convidados</Text>
            <Text style={defaultStyles.subtitleWhite}>
              {numContatos > 0 ? numContatos : "Nenhum"} contato{numContatos >= 2 ? 's' : ''}
            </Text>

            <ConvidadosSearchField 
              style={{ marginTop: 25 }}
              onChangeText={this.search.bind(this)}
            />
            <Text style={{ color: "#ccc" }}>Selecione os Convidados</Text>
          </View>

          <FlatList
            data={this.state.searchContacts}
            keyExtractor={item => item.id}
            renderItem={
              ({ item, index }) =>
                <ConvidadosListRow data={item} rowIndex={index} onToggleSelect={this._onToggleUserSelect.bind(this)} />
            }
          />

        </ScrollView>

        <Animated.View style={styles.fabContainer}>
          <FAB
            icon="keyboard-arrow-right"
            onPress={this.createEvent.bind(this)}
            style={{
              transform: [
                {
                  translateY: this.fabButtonTranslate
                }
              ]
            }}
          />
        </Animated.View>

        <LoadingModal visible={this.state.loading} />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    bottom: 15,
    right: 15
  }
})

export default withNavigation(SelecionarConvidados)