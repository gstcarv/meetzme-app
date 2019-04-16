import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View,
  Image,
  Alert,
  ScrollView
} from 'react-native'

import Snackbar from 'react-native-snackbar'

import BottomSheet from "react-native-raw-bottom-sheet";

import {
  Button,
  TextField
} from '@/components/Forms'

import fonts from '@/resources/fonts'
import colors from '@/resources/colors'

export default class EditUserBottomSheet extends Component {

  constructor() {
    super();
    this.state = {
      title: "",
      initialText: "",
      submitButtonText: "Enviar"
    }
  }

  open({ title, initialText, submitButtonText, onSubmit }) {
    this.setState({
      title,
      initialText,
      submitButtonText,
      onSubmit
    })


    this.EventSheet.open()
  }

  render() {

    return (
      <BottomSheet
        ref={ref => {
          this.EventSheet = ref;
        }}
        height={170}
        duration={300}
        customStyles={{
          container: {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            paddingHorizontal: 20
          }
        }}
      >
        <View style={styles.topSheetLine} />

        <TextField
          label={this.state.title}
          value={this.state.initialText}
          onChangeText={(text) => this.setState({ initialText: text })}
          autoCapitalize="words"
        />

        <View style={styles.buttonContainer}>
          <Button
            mode="outlined"
            small
            onPress={() => this.EventSheet.close()}
            style={{
              marginRight: 6,
              ...styles.buttonStyle
            }}>Cancelar</Button>
          <Button color='#47C1CF'
            mode="outlined"
            small
            icon="check"
            onPress={() => {
              this.EventSheet.close()
              this.state.onSubmit(this.state.initialText)
            }}
            style={{
              borderColor: "#47C1CF",
              ...styles.buttonStyle
            }}>{this.state.submitButtonText}</Button>
        </View>
      </BottomSheet >
    )
  }
}

const styles = StyleSheet.create({
  topSheetLine: {
    width: '40%',
    height: 8,
    backgroundColor: '#F1F1F1',
    alignSelf: 'center',
    margin: 10,
    borderRadius: 10
  },
  buttonContainer: {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'row',
    marginTop: 15
  },
  buttonStyle: {
    borderWidth: 1,
    fontSize: 10
  }
})
