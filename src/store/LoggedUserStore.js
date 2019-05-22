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
  async updatePhoto(image) {

    const { uid } = this.info;

    // Envia a foto para o Storage
    const userProfileImageRef = firebase.storage().ref('profile').child(uid)
    var fileUpload = await userProfileImageRef.putFile(image.path, {
      contentType: image.mime
    })

    const downloadURL = fileUpload.downloadURL;

    // Atualiza a foto no firestore
    await firebase.firestore()
      .collection('users')
      .doc(uid)
      .update({
        photoURL: downloadURL
      })

    // Atualiza a foto Store
    this.info.photoURL = downloadURL

    // Atualiza a foto no AsyncStorage
    const user = JSON.parse(await AsyncStorage.getItem("USER_DATA"))

    if (user) {
      user.photoURL = downloadURL
      await AsyncStorage.setItem("USER_DATA", JSON.stringify(user))
    }

    // Atualiza a foto no usuário
    await firebase.auth().currentUser.updateProfile({
      photoURL: downloadURL
    })
  }

  @action
  async updateData({ name }) {

    const { uid } = this.info;
    
    // Atualiza os dados Store
    this.info.name = name

    // Atualiza os dados no firestore
    await firebase.firestore()
      .collection('users')
      .doc(uid)
      .update({ name })

    // Atualiza os dados no AsyncStorage
    const user = JSON.parse(await AsyncStorage.getItem("USER_DATA"))

    if (user) {
      user.name = name
      await AsyncStorage.setItem("USER_DATA", JSON.stringify(user))
    }

    // Atualiza os dados no usuário
    await firebase.auth().currentUser.updateProfile({
      displayName: name
    })
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

  async getLocation() {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(
        async pos => {
          resolve(pos.coords)
        },
        err => { reject(err) },
        { enableHighAccuracy: false, timeout: 10000 }
      )
    });
  }

  async getAndSendLocation(){
    try {
      this.sendLocation(await this.getLocation())
    } catch {}
  }
  
  @action async loggout(){
    await firebase.auth().signOut()
    this.info = {}
  }

}

export default new LoggedUserStore();