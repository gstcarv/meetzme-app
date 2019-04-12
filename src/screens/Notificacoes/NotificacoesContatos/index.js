import React, { Component } from 'react'
import {
  FlatList,
  StyleSheet,
  View,
  ScrollView
} from 'react-native'

import NotificationCard from '@/components/Notificacoes/NotificationCard'

import { inject, observer } from 'mobx-react/native'
import { toJS } from 'mobx'

@inject('NotificationsStore')
@observer
export default class NotificacoesContatos extends Component {

  render() {

    let notificationsData = toJS(this.props.NotificationsStore.contactsNotifications);

    return (
      <ScrollView>

        <FlatList
          data={notificationsData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={
            ({ item: notificationData }) => (
              <NotificationCard
               {...notificationData}
              />
            )
          }
          style={styles.notificationsFlatList}
        />

      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  notificationsFlatList: {
    padding: 15,
  }
})
