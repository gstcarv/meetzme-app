import React, { Component } from 'react'
import ReactNative from 'react-native'

import {
  StyleSheet,
  View,
  StatusBar,
  DatePickerAndroid,
  TimePickerAndroid,
  TouchableNativeFeedback
} from 'react-native'

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
  Text,
  TouchableRipple
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
      eventDateTime: new Date(Date.now()),
      image: null
    }
  }

  async selectDateTime() {

    const now = Date.now();

    const { action, year, month, day } = await DatePickerAndroid.open({
      date: now,
      minDate: now
    });
    if (action !== DatePickerAndroid.dismissedAction) {
      let eventDateTime = new Date()
      eventDateTime.setUTCFullYear(year)
      eventDateTime.setUTCMonth(month)
      eventDateTime.setUTCDate(day)

      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: new Date(now).getHours(),
        minute: new Date(now).getMinutes()
      });

      if (action !== TimePickerAndroid.dismissedAction) {
        eventDateTime.setHours(hour);
        eventDateTime.setMinutes(minute)

        this.setState({ eventDateTime })
      }
    }
  }

  gotoNextInput(fieldName) {
    const ref = this.refs[fieldName];
    this.refs[fieldName].focus()
    this.cadastroScroll.props.scrollToFocusedInput(ReactNative.findNodeHandle(ref))
  }

  next(){
    this.props.navigation.navigate('SelecionarLocalizacao', {
      infoEvento: this.state
    })
  }

  render() {

    const getDateTimeValue = () => {
      const { eventDateTime } = this.state;

      var eventTime = eventDateTime.toLocaleTimeString()

      var eventTimeFormat = eventTime.split(":");
      eventTimeFormat.pop();
      eventTimeFormat = eventTimeFormat.join(":").replace(":", "h")
      eventTime = eventTimeFormat;

      var dateobj = eventDateTime;
      function pad(n) { return n < 10 ? "0" + n : n; }
      var eventDate = pad(dateobj.getDate()) + "/" + pad(dateobj.getMonth() + 1) + "/" + dateobj.getFullYear();

      return `${eventDate} ${eventTime} `;
    }

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
            <Text style={defaultStyles.titleWhite}>Novo Evento</Text>
            <Text style={defaultStyles.subtitleWhite}>Insira as Informações do evento nos campos abaixo</Text>
          </View>

          <View style={styles.formContainer}>

            <EventImageSelector onSelectImage={image => this.setState({ image })}/>

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
              onChangeText={description => this.setState({ description })} />

            <Line />

            <TouchableRipple onPress={() => this.selectDateTime()}
              style={styles.fieldDateContainer}
              rippleColor={"#fff"}>
              <TextField
                label="Data do Evento"
                maxLength={200}
                placeholder="Selecione a Data e Horário do Evento"
                value={getDateTimeValue()}
                disabled
              />
            </TouchableRipple>
          </View>

          <Button mode="contained"
            noRadius
            icon="gps-fixed"
            onPress={() => this.next()}>Selecionar Localização</Button>
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
  },
  fieldDateContainer: {
    padding: 6,
    paddingTop: 1,
    borderRadius: 5
  }
})

export default withNavigation(CadastrarEvento);
