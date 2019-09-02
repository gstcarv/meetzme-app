import React, { Component } from 'react'
import {
  FlatList,
  StyleSheet,
  View,
  ScrollView
} from 'react-native'

import { Text } from 'react-native-paper'

import NotificationCard from '@/components/Notificacoes/NotificationCard'

import { inject, observer } from 'mobx-react/native'
import { toJS } from 'mobx'

import { withNavigation } from 'react-navigation'

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
  }
})
