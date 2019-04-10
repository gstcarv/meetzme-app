import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

import NotificationCard from '@/components/Notificacoes/NotificationCard'

export default class NotificacoesEventos extends Component {
  render() {
    return (
      <View style={{padding: 20}}>
        <NotificationCard 
          title="HelloWorld"
          description="Oh My God"
          date={new Date()}
          type="event"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({})
