import {
  observable,
  action
} from 'mobx'

import firebase, { firestore } from 'react-native-firebase'

class LoggedUserStore {
  @observable info = {}
  @observable lastLocation = {}

  @action
  setUser(data) {
    this.info = data
  }

  get() {
    return this.info;
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