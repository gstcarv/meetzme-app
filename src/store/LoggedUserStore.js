import {
  observable,
  action
} from 'mobx'

import firebase, { firestore } from 'react-native-firebase'

import { AsyncStorage } from 'react-native'

class LoggedUserStore {
  @observable info = {}
  @observable lastLocation = {}

  get() {
    return this.info;
  }

  @action
  setUser(data) {
    this.info = data
  }

  @action
  async updateToken(token) {
    if (this.info.uid) {
      await firebase.firestore()
        .collection('users')
        .doc(this.info.uid)
        .update({ FCMToken: token })
      this.info.FCMToken = token;
      await AsyncStorage.setItem("USER_DATA", this.info)
    }
  }

  @action
  async sendLocation(coords) {
    const { uid } = this.get();
    this.lastLocation = coords;
    await firebase.firestore()
      .collection('users')
      .doc(uid)
      .update({
        lastLocation: coords
      })
  }

}

export default new LoggedUserStore();