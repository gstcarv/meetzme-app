import {
  observable,
  action
} from 'mobx'

import firebase, { firestore } from 'react-native-firebase'

import { AsyncStorage } from 'react-native'

class NotificationsStore {
  @observable notifications = []

  @action
  fetchNotifications(){

  }

  @action
  addNotification(notification){
    
  }

}

export default new NotificationsStore();