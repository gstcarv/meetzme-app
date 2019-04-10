import {
  observable,
  action,
  computed
} from 'mobx'

import { AsyncStorage } from 'react-native'

class NotificationsStore {
  @observable notifications = []

  get(){
    return this.notifications;
  }

  @action
  async fetchNotifications(){

    let notifications = await AsyncStorage.getItem("notifications");
    notifications = JSON.parse(notifications);

    this.notifications = notifications;
  }

  @action
  async addNotification(notification){
    
  }

  @computed get
  eventsNotifications(){
    return this.get().filter(notification => notification.type == "event")
  }

  @computed get
  contactsNotifications(){
    return this.get().filter(notification => notification.type == "contacts")
  }

}

export default new NotificationsStore();