import {
  observable,
  action,
  computed
} from 'mobx'

import { AsyncStorage } from 'react-native'

class NotificationsStore {
  @observable notifications = []
  fetched = false;

  get(){
    return this.notifications;
  }

  @action
  async fetchNotifications(){
    let notifications = await AsyncStorage.getItem("DEVICE_NOTIFICATIONS");
    notifications = JSON.parse(notifications);

    fetched = true;

    this.notifications = notifications || [];
  }

  @action
  async addNotification(notification){
    if(!fetched){
      this.fetchNotifications()
    }

    this.notifications.unshift(notification)

    await AsyncStorage.setItem("DEVICE_NOTIFICATIONS", JSON.stringify(this.get()))

  }

  @computed get
  eventsNotifications(){
    return this.get().filter(notification => notification.type == "events")
  }

  @computed get
  contactsNotifications(){
    return this.get().filter(notification => notification.type == "contacts")
  }

}

export default new NotificationsStore();