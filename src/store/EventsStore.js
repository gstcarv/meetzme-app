import {
  observable,
  action,
  computed,
  toJS
} from 'mobx'

import firebase from 'react-native-firebase'

import LoggedUserStore from './LoggedUserStore'

const firestoreRef = firebase.firestore();

class EventsStore {

  @observable acceptedEvents = []
  @observable pendingEvents = []
  @observable eventsID = []
  @observable lastUserCreatedEvent = "2D4yNTHxb4tNEI2S5ZYa"

  @action clearLastUserCreatedEvent() {
    this.lastUserCreatedEvent = null
  }

  searchPendingEvents(text) {
    return this.pendingEvents.filter(event => {
      return event.title
        .toLowerCase()
        .includes(text.toLowerCase())
    })
  }

  searchAcceptedEvents(text) {
    return this.acceptedEvents.filter(event => {
      return event.title
        .toLowerCase()
        .includes(text.toLowerCase())
    })
  }

  getByID(id) {
    return this.acceptedEvents.find(ev => ev.id == id)
  }

  @action
  watchEvents() {

    const userID = LoggedUserStore.get().uid;

    let now = new Date(Date.now());

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
              if (doc.data().endTrackingDatetime > now) {
                this.pendingEvents.unshift({
                  id: doc.id,
                  ...doc.data()
                })
              }
            }
          } else if (changedDoc.type == "removed") {
            // Remove do Store de Eventos Pendentes
            this.pendingEvents = this.pendingEvents.filter(event => (
              event.id != doc.id
            ))
          }

          this.sortPendingEvents()

        })
      })
  }

  async refreshEventData(eventID) {
    let eventData = await firestoreRef
      .collection('events')
      .doc(eventID)
      .get();

    let oldEventIndex = this.acceptedEvents.findIndex(event => event.id == eventID)
    this.acceptedEvents[oldEventIndex] = {
      id: eventID,
      ...eventData.data()
    };
  }

  @action sortPendingEvents() {
    this.pendingEvents = toJS(this.pendingEvents).sort((a, b) => {
      const firstDate = new Date(a.createdAt),
        secondDate = new Date(b.createdAt);
      if (firstDate > secondDate) {
        return -1
      } else {
        return 1
      }
    })
  }

  @action sortAcceptedEvents() {
    this.acceptedEvents = toJS(this.acceptedEvents).sort((a, b) => {
      const firstDate = new Date(a.datetime),
        secondDate = new Date(b.datetime);
      if (firstDate > secondDate) {
        return 1
      } else {
        return -1
      }
    })
  }

  @action
  async fetchEvents() {
    // Pegar os eventos aceitos
    const userID = LoggedUserStore.get().uid;

    // Procura os Eventos do Usuário Logado
    let now = new Date(Date.now());

    let acceptedEvents = await firestoreRef
      .collection('events')
      .where(`participants.${userID}`, "==", true)
      .get();

    // Adiciona no Store
    acceptedEvents.forEach(event => {
      if (!this.eventsID.includes(event.id)) {
        if (event.data().endTrackingDatetime > now) {
          this.eventsID.push(event.id)
          this.acceptedEvents.push({
            id: event.id,
            ...event.data()
          })
        }
      }
    })

    this.sortAcceptedEvents()

  }

  async getEventParticipants(eventID) {
    // Pega as IDS dos Pariticipantes na Array de Eventos
    let invites = this.acceptedEvents.find(event => event.id == eventID).participants
    let users = []

    // Pega dos dados de cada participante
    for (let invitedUser in invites) {
      let inviteState = invites[invitedUser];
      if (inviteState == true) {
        users.push(await this.getParticipantData(invitedUser, eventID))
      }
    }
    return users;
  }

  async getParticipantData(userID, eventID) {
    const userRef = firestoreRef
      .collection('users')
      .doc(userID)

    let user = await userRef.get();

    let participantEventInfo = await userRef
      .collection('acceptedEvents')
      .doc(eventID)
      .get();

    return {
      uid: user.id,
      ...user.data(),
      ...participantEventInfo.data()
    }
  }

  @computed
  get userCreatedEvents() {

    const userID = LoggedUserStore.get().uid;

    // Retorna os Eventos na qual o Usuário é o Administrador
    return this.acceptedEvents.filter(event => {
      return event.adminID == userID
    })
  }

  @action
  async createEvent(eventInfo) {
    const adminID = LoggedUserStore.get().uid

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

    let initTrackingDatetime = new Date(eventDateTime).setHours(eventDateTime.getHours() - 4),
      endTrackingDatetime = new Date(eventDateTime).setHours(eventDateTime.getHours() + 4);

    let newEventData = {
      adminID,
      title,
      description,
      datetime: eventDateTime,
      initTrackingDatetime,
      endTrackingDatetime,
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

    lastUserCreatedEvent = newEventRef.id;

    this.sortAcceptedEvents();

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
    const userID = LoggedUserStore.get().uid;

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
    const userID = LoggedUserStore.get().uid;

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
  async exitEvent(event) {
    const {
      id: eventID,
      participants
    } = event;

    let userID = LoggedUserStore.get().uid

    delete participants[userID]

    this.acceptedEvents =
      this.acceptedEvents.filter(atualEvent => atualEvent.id != event.id)

    await firestoreRef
      .collection('events')
      .doc(eventID)
      .update({ participants })
  }

  @action
  async inviteUsers(event, newUsers){
    const {
      id: eventID,
      participants
    } = event;

    newUsers.forEach(user => participants[user] = null)

    await firestoreRef
      .collection('events')
      .doc(eventID)
      .update({ participants })
  }

  @action
  async undoRecuse(event) {
    const userID = LoggedUserStore.get().uid;

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

  @action
  clearStore(){
    this.pendingEvents = []
    this.acceptedEvents = []
    this.eventsID = []
  }

}

export default new EventsStore()