import {
  observable,
  action,
  computed
} from 'mobx'

import firebase from 'react-native-firebase'

import LoggedUserStore from './LoggedUserStore'

class EventsStore {

  @observable acceptedEvents = []
  @observable pendingEvents = []
  @observable eventsID = []

  @action
  watchEvents() {

    const userID = LoggedUserStore.info.uid;

    // Pega os Eventos Pendentes em Tempo Real
    firebase.firestore()
      .collection('events')
      .where(`participants.${userID}`, '==', null)
      .onSnapshot(snap => {
        snap.docChanges.forEach(changedDoc => {
          // Adiciona no Store de Eventos Pendentes
          const { doc } = changedDoc;
          if (changedDoc.type == "added") {
            this.pendingEvents.push({
              id: doc.id,
              ...doc.data()
            })
          } else if (changedDoc.type == "removed") {
            this.pendingEvents = this.pendingEvents.filter(event => (
              event.id != doc.id
            ))
          }
        })
      })
  }

  @action
  async fetchEvents() {

    const userID = LoggedUserStore.info.uid;

    // Procura os Eventos do Usuário Logado
    let acceptedEvents = await firebase.firestore()
      .collection('events')
      .where(`participants.${userID}`, "==", true)
      .get();

    // Adiciona no Store
    acceptedEvents.forEach(event => {
      if (!this.eventsID.includes(event.id)) {
        this.eventsID.push(event.id)
        this.acceptedEvents.push({
          id: event.id,
          ...event.data()
        })
      }
    })
  }

  @computed
  get userCreatedEvents(){

    const userID = LoggedUserStore.info.uid;

    // Retorna os Eventos na qual o Usuário é o Administrador
    return this.acceptedEvents.filter(event => {
      return event.adminID == userID
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

    let participants = {}
    participants[adminID] = true
    invitedUsers.forEach(uid => {
      participants[uid] = null
    })

    let newEventData = {
      adminID,
      title,
      description,
      datetime: eventDateTime,
      locationName,
      destination,
      participants: participants,
      imageURL,
      createdAt: new Date(Date.now())
    }

    // Adiciona evento no banco
    await newEventRef.set(newEventData)

    // Adiciona Evento no Store
    this.acceptedEvents.push({
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

  @action
  async acceptEvent({ eventID, transportMode }) {
    const userID = LoggedUserStore.info.uid;

    const firestoreRef = firebase.firestore()

    // Adiciona o Evento à Collection de Eventos Aceitos do Usuário
    await firestoreRef
      .collection('users')
      .doc(userID)
      .collection('acceptedEvents')
      .doc(eventID)
      .set({
        transportMode,
        acceptedAt: new Date(Date.now())
      })

    // Pega os Dados do Evento Aceito
    let acceptedEvent = this.pendingEvents.find(event => event.id == eventID);

    // Faz o Usuário Participar do Evento na Collection de Eventos
    await firestoreRef
      .collection('events')
      .doc(eventID)
      .set({
        participants: {
          [userID]: true
        }
      }, { merge: true })

    // Adiciona o Evento a Array de Eventos Aceitos
    this.acceptedEvents.push(acceptedEvent);
  }
}

export default new EventsStore()