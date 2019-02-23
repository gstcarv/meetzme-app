import {
  observable,
  action
} from 'mobx'

import firebase from 'react-native-firebase'

import LoggedUserStore from './LoggedUserStore'

class EventsStore {
  @observable events = []

  @action
  async createEvent(eventInfo) {
    const adminID = LoggedUserStore.info.uid

    const {
      title,
      description,
      eventDateTime,
      destination,
      image,
      transport,
      locationName,
      invitedUsers
    } = eventInfo

    const newEventRef = firebase.firestore().collection('events').doc(),
      eventImageRef = firebase.storage().ref('events').child(newEventRef.id)

    var fileUpload = await eventImageRef.putFile(image.path, {
      contentType: image.mime
    })

    let imageURL = fileUpload.downloadURL;

    let newEvent = await newEventRef.set({
      adminID,
      title,
      description,
      datetime: eventDateTime,
      locationName,
      destination,
      participants: [adminID],
      invitedUsers,
      imageURL
    })

    console.log(newEvent)
    
    await firebase.firestore()
      .collection('users')
      .doc(adminID)
      .collection('acceptedEvents')
      .doc(newEventRef.id)
      .set({
        acceptedAt: Date.now(),
        transportMode: transport
      })
  }
}

export default new EventsStore()