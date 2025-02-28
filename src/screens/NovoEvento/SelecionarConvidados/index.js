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

import {
  withNavigation,
} from 'react-navigation'

import SavingEventModal from '@/components/NovoEvento/SavingEventModal'
import BackBar from '@/components/BackBar'
import ConvidadosSearchField from '@/components/NovoEvento/ConvidadosSearchField'
import ConvidadosListRow from '@/components/NovoEvento/ConvidadosListRow'
import defaultStyles from '@/resources/defaultStyles'

import {
  inject,
  observer
} from 'mobx-react/native'
import { Button } from '@/components/Forms';

@inject('ContactsStore')
@inject('EventsStore')
@observer
class SelecionarConvidados extends Component {

  constructor(props) {
    super()
    this.state = {
      convidados: [],
      fabVisible: false,
      loading: false
    }

    this.fabButtonTranslate = new Animated.Value(100)

  }

  componentDidMount() {
    this.props.ContactsStore.clearSearch()
  }

  componentWillUnmount() {
    this.props.ContactsStore.clearSearch()
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

    if (this.state.convidados.length == 0) {
      return
    }

    this.setState({ loading: true })

    try {

      await this.props.EventsStore.createEvent({
        ...navigation.getParam('infoEvento'),
        invitedUsers: this.state.convidados
      })

      this.setState({ loading: false })

      this.props.navigation.navigate("EventosAceitos");
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

    const { ContactsStore } = this.props;

    let numContatos = ContactsStore.contacts.length;

    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="#F5F5F5"
          barStyle="dark-content"
          animated />

        <BackBar
          rightButton="person-add"
          onRightButtonPressed={() => {
            this.props.navigation.navigate('Procurar')
          }}
        />

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
              onChangeText={text => ContactsStore.search(text)}
            />

            {
              numContatos > 0 &&
              <Text style={{ color: "#ccc" }}>Selecione os Convidados</Text>
            }

          </View>

          <FlatList
            data={ContactsStore.searchContacts}
            keyExtractor={item => item.uid}
            renderItem={
              ({ item, index }) =>
                <ConvidadosListRow 
                  data={item} 
                  rowIndex={index} 
                  onToggleSelect={this._onToggleUserSelect.bind(this)}
                  isActive={this.state.convidados.includes(item.id)}
                />
            }
          />


        {
          ContactsStore.searchContacts.length == 0 && numContatos > 0 &&
          <Text style={[defaultStyles.titleWhite, styles.emptyText]}>
            Não encontrado nenhum contato com esse nome. Escreveu certo?
          </Text>
      }

        { 
          numContatos == 0 &&
          <View style={styles.noContactsContainer}>
            <Text style={[defaultStyles.titleWhite, { textAlign: 'center' }]}>Você ainda não tem nenhum contato! Bora adicionar?</Text>
            <Button mode="contained"
              style={{ marginTop: 10 }}
              icon="person-add"
              onPress={() => this.props.navigation.navigate('Procurar')}>Adicionar Contatos</Button>
          </View>
        }

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

        <SavingEventModal visible={this.state.loading} />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    bottom: 15,
    right: 15
  },
  noContactsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: { 
    textAlign: 'center', 
    margin: 8,
    fontSize: 20
  }
})

export default withNavigation(SelecionarConvidados)