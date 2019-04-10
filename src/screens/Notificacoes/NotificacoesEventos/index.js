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
export default class NotificacoesEventos extends Component {

  render() {

    let notificationsData = toJS(this.props.NotificationsStore.eventsNotifications);

    return (
      <ScrollView>

        <FlatList
          data={notificationsData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={
            ({ item, index }) => (
              <NotificationCard
                title={item.title}
                description={item.description}
                date={item.date}
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
