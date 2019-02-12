import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  StatusBar,
} from 'react-native'

import ReactNative from 'react-native'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {
  withNavigation
} from 'react-navigation'

import {
  Button,
  TextField,
  Line
} from '@/components/Forms'

import {
  Switch,
  Text
} from 'react-native-paper'

import EventImageSelector from '@/components/NovoEvento/EventImageSelector'

import defaultStyles from '@/resources/defaultStyles'
import BackBar from '../../../components/BackBar';

class CadastrarEvento extends Component {

  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      eventDateTime: "",
      locationWatchDelay: "",
      isEventNow: true
    }
  }

  gotoNextInput(fieldName) {
    const ref = this.refs[fieldName];
    this.refs[fieldName].focus()
    this.cadastroScroll.props.scrollToFocusedInput(ReactNative.findNodeHandle(ref))
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

            <EventImageSelector />

            <Line spaceVertical={20} />

            <TextField
              label="Titulo"
              maxLength={40}
              placeholder="Digite o Titulo do Evento"
              style={styles.field}
              value={this.state.title}
              onChangeText={title => this.setState({ title })} />

            <TextField
              label="Descrição"
              maxLength={200}
              placeholder="Digite a Descrição do Evento"
              multiline
              style={[styles.field, { height: 160 }]}
              value={this.state.description}
              onChangeText={description => this.setState({ description }) } />

            <Line />

            <View style={styles.nowContainer}>
              <Text style={{ color: "#bbb" }}>Começar agora</Text>
              <Switch 
                value={this.state.isEventNow}
                onValueChange={() => {
                  this.setState({ isEventNow: !this.state.isEventNow })
                }}/>
            </View>

          </View>

          <Button mode="contained"
            noRadius
            icon="keyboard-arrow-right"
            onPress={() => {}}>Próximo</Button>
        </KeyboardAwareScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 20,
    flex: 1,
    marginBottom: 20,
    marginTop: 20
  },
  field: {
    marginBottom: 7
  },
  nowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})

export default withNavigation(CadastrarEvento);
