import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  StatusBar,
  ScrollView,
  FlatList,
  Animated,
  Easing
} from 'react-native'

import {
  Text,
  FAB
} from 'react-native-paper'

import BackBar from '@/components/BackBar'
import ConvidadosSearchField from '@/components/NovoEvento/ConvidadosSearchField'
import ConvidadosListRow from '@/components/NovoEvento/ConvidadosListRow'
import defaultStyles from '@/resources/defaultStyles'

export default class SelecionarConvidados extends Component {

  constructor() {
    super()
    this.state = {
      contatos: [
        {
          id: 1,
          name: "Gustavo",
          username: "@gustavo",
          profileImage: require('@assets/images/event-test-image.jpg')
        },
        {
          id: 2,
          name: "Bia",
          username: "@bia_kun",
          profileImage: require('@assets/images/event-test-image.jpg')
        },
        {
          id: 3,
          name: "Tiago",
          username: "@tg_silva",
          profileImage: require('@assets/images/event-test-image.jpg')
        },
        {
          id: 4,
          name: "Ana Júlia",
          username: "@aj_brb",
          profileImage: require('@assets/images/event-test-image.jpg')
        },
        {
          id: 5,
          name: "Bruno Willian",
          username: "@brn_willian",
          profileImage: require('@assets/images/event-test-image.jpg')
        },
        {
          id: 6,
          name: "Alan F.",
          username: "@alan_ff_gamer",
          profileImage: require('@assets/images/event-test-image.jpg')
        }
      ],
      convidados: [],
      fabVisible: false
    }

    this.fabButtonTranslate = new Animated.Value(100)

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

  render() {
    
    return (

      <View>
        <StatusBar backgroundColor="#F5F5F5"
          barStyle="dark-content"
          animated />

        <BackBar />

        <ScrollView style={{ marginBottom: 55 }}>
          <View style={{
            paddingHorizontal: 20,
            marginTop: 20,
            marginBottom: 20
          }}>
            <Text style={defaultStyles.titleWhite}>Convidados</Text>
            <Text style={defaultStyles.subtitleWhite}>29 Contatos</Text>

            <ConvidadosSearchField style={{ marginTop: 25 }} />
            <Text style={{ color: "#ccc" }}>Selecione os Convidados</Text>
          </View>

          <FlatList
            data={this.state.contatos}
            keyExtractor={item => item.id.toString()}
            renderItem={
              ({ item, index }) =>
                <ConvidadosListRow data={item} rowIndex={index} onToggleSelect={this._onToggleUserSelect.bind(this)} />
            }
          />

        </ScrollView>

        <Animated.View style={styles.fabContainer}>
          <FAB
            icon="keyboard-arrow-right"
            onPress={() => console.warn('Pressed')}
            style={{
              transform: [
                {
                  translateY: this.fabButtonTranslate
                }
              ]
            }}
          />
        </Animated.View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    bottom: 70,
    right: 15
  }
})
