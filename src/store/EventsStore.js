import {
  observable,
  action
} from 'mobx'

import firebase from 'react-native-firebase'

import LoggedUserStore from './LoggedUserStore'

class EventsStore {
  @observable events = []
  @observable eventsID = []

  @action
  async fetchEvents() {

    let userID = LoggedUserStore.info.uid;

    // Procura os Eventos do Usuário Logado
    let acceptedEvents = await firebase.firestore()
      .collection('events')
      .where("participants", "array-contains", userID)
      .get();

    // Adiciona no Store
    acceptedEvents.forEach(event => {
      if(!this.eventsID.includes(event.id)){
        this.eventsID.push(event.id)
        this.events.push({
          id: event.id,
          ...event.data()
        })
      }
    })
  }

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

    // Cria um novo documento para o Evento
    const newEventRef = firebase.firestore().collection('events').doc(),
      eventImageRef = firebase.storage().ref('events').child(newEventRef.id)

    // Faz upload da Imagem
    var fileUpload = await eventImageRef.putFile(image.path, {
      contentType: image.mime
    })

    let imageURL = fileUpload.downloadURL;

    let newEventData = {
      adminID,
      title,
      description,
      datetime: eventDateTime,
      locationName,
      destination,
      participants: [adminID],
      invitedUsers,
      imageURL
    }

    // Adiciona evento no banco
    await newEventRef.set(newEventData)

    // Adiciona Evento no Store
    this.events.push({
      id: newEventRef.id,
      ...newEventData
    })

    this.eventsID.push(newEventRef.id)

    // Adiciona o Admin ao Evento criado
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