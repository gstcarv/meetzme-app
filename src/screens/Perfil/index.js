import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View,
  AsyncStorage,
  Image,
  ScrollView,
  StatusBar
} from 'react-native'

import { 
  FAB
} from 'react-native-paper'

import TouchableRipple from 'react-native-material-ripple'

import BackButton from '@/components/BackButton'

import FAIcon from 'react-native-vector-icons/FontAwesome5'

import {
  withNavigation
} from 'react-navigation'

import {
  TextField
} from '@/components/Forms'

import colors from '@/resources/colors'
import TouchableScale from 'react-native-touchable-scale';

import { inject, observer } from 'mobx-react/native'

@inject('LoggedUserStore')
@observer
class Perfil extends Component {

  render() {

    const { info: infoUser } = this.props.LoggedUserStore

    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          animated
          backgroundColor={colors.primaryDark}
        />
        <ScrollView style={styles.container}>
          <View style={styles.headerContainer}>
            <View style={styles.headerFill}></View>
            <TouchableScale
              style={styles.imageContainer}>
              <View>
                <Image
                  source={{uri: infoUser.photoURL}}
                  style={styles.image}
                />
              </View>
            </TouchableScale>
          </View>
          <View style={styles.fieldsContainer}>
            <TextField
              label="Nome"
              value={infoUser.displayName}
              disabled
              style={styles.textInput}
            />

            <TextField
              label="Nome de Usuário"
              value={"@" + infoUser.displayName}
              disabled
              style={styles.textInput}
            />

            <TextField
              label="Email"
              value={infoUser.email}
              disabled
              style={styles.textInput}
            />

            <TextField
              label="Telefone"
              value={infoUser.displayName}
              disabled
              style={styles.textInput}
            />

          </View>

          <BackButton color="#fff" />
          <TouchableRipple style={styles.configButton}>
            <View>
              <FAIcon name="cogs" color="#fff" size={25}/>
            </View>
          </TouchableRipple>

        </ScrollView>
        <FAB
          icon="edit"
          style={styles.fabEdit}
        />
      </View >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {
    height: 270,
    backgroundColor: 'transparent'
  },
  headerFill: {
    backgroundColor: colors.primaryColor,
    height: 200
  },
  imageContainer: {
    position: 'absolute',
    bottom: 0,
    overflow: 'hidden',
    alignSelf: 'center'
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 12,
    borderColor: colors.primaryColor,
    overflow: 'hidden'
  },
  fieldsContainer: {
    padding: 20,
  },
  textInput: {
    marginTop: 14
  },
  fabEdit: {
    position: 'absolute',
    bottom: 15,
    right: 15
  },
  configButton: {
    position: 'absolute',
    top: 7,
    right: 7,
    padding: 10,
    borderRadius: 50
  }
})

export default withNavigation(Perfil)