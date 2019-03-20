import {
  observable,
  action,
  computed
} from 'mobx'

import firebase from 'react-native-firebase'

import LoggedUserStore from './LoggedUserStore'

const firestoreRef = firebase.firestore();

class EventsStore {

  @observable acceptedEvents = []
  @observable pendingEvents = []
  @observable eventsID = []

  @action
  watchEvents() {

    const userID = LoggedUserStore.info.uid;

    // Pega os Eventos Pendentes em Tempo Real
    firestoreRef
      .collection('events')
      .where(`participants.${userID}`, '==', null)
      .onSnapshot(snap => {
        snap.docChanges.forEach(changedDoc => {
          const { doc } = changedDoc;
          if (changedDoc.type == "added") {
            // Adiciona no Store de Eventos Pendentes
            let eventExists = this.pendingEvents.some(event => event.id == doc.id);
            if (!eventExists) {
              this.pendingEvents.push({
                id: doc.id,
                ...doc.data()
              })
            }
          } else if (changedDoc.type == "removed") {
            // Remove do Store de Eventos Pendentes
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
    let acceptedEvents = await firestoreRef
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

  async getEventParticipants(eventID) {
    let invites = this.acceptedEvents.find(event => event.id == eventID).participants
    let users = []
    for(let invitedUser in invites){
      let inviteState = invites[invitedUser];
      if(inviteState == true){
        let user = await firestoreRef
          .collection('users')
          .doc(invitedUser)
          .get()
        users.push(user.data())
      }
    }
    return users;
  }

  @computed
  get userCreatedEvents() {

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
    const newEventRef = firestoreRef.collection('events').doc(),
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
    await firestoreRef
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

  @action
  async recuseEvent(eventID) {
    const userID = LoggedUserStore.info.uid;

    // Remove o Convite da Array de Convites
    this.pendingEvents = this.pendingEvents.filter(event => (
      event.id != eventID
    ))

    // Recusa o Convite
    await firestoreRef
      .collection('events')
      .doc(eventID)
      .set({
        participants: {
          [userID]: false
        }
      }, { merge: true })
  }

  @action
  async undoRecuse(event) {
    const userID = LoggedUserStore.info.uid;

    // Adiciona de volta o Evento
    this.pendingEvents.push(event)

    // Desfaz a ação de recusar o convite
    await firestoreRef
      .collection('events')
      .doc(event.id)
      .set({
        participants: {
          [userID]: null
        }
      }, { merge: true })
  }
}

export default new EventsStore()