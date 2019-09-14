import React, { Component } from 'react'
import {
  FlatList,
  StyleSheet,
  View,
  ScrollView
} from 'react-native'

import { Text } from 'react-native-paper'

import fonts from '@/resources/fonts'

import NotificationCard from '@/components/Notificacoes/NotificationCard'

import { inject, observer } from 'mobx-react/native'
import { toJS } from 'mobx'

import { withNavigation } from 'react-navigation'

import FAIcon from 'react-native-vector-icons/FontAwesome5'

@inject('NotificationsStore')
@observer
@withNavigation
export default class NotificacoesEventos extends Component {

  _onNotificationCardPress(data) {
    const { navigation } = this.props;
    if (data.description.includes("aceitou")) {
      navigation.navigate('EventosAceitos');
    } else if (data.description.includes("convidou")) {
      navigation.navigate('EventosPendentes');
    }
  }

  render() {

    let notificationsData = toJS(this.props.NotificationsStore.eventsNotifications);

    let hasNotifications = notificationsData.length != 0

    if (!hasNotifications) {
      return (
        <View style={styles.emptyContainer}>
          <FAIcon name="comment-alt" size={150} color="#eee" />
          <Text style={styles.emptyText}>Nenhuma notificação aqui ainda!</Text>
        </View>
      )
    }

    return (
      <ScrollView style={styles.container}>

        <FlatList
          data={notificationsData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={
            ({ item: notificationData }) => (
              <NotificationCard
                {...notificationData}
                onPress={() => _onNotificationCardPress(notificationData)}
              />
            )
          }
          style={styles.notificationsFlatList}
        />

        {
          notificationsData.length == 0 &&
          <Text style={{ textAlign: 'center' }}>Nenhuma notificação aqui :(</Text>
        }

      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F9FAFC"
  },
  notificationsFlatList: {
    padding: 15,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: "#F9FAFC"
  },
  emptyText: {
    fontFamily: fonts.primary,
    color: '#ccc',
    fontSize: 25,
    marginTop: 30,
    textAlign: 'center'
  }
})
