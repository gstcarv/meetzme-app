import {
  observable,
  action,
  computed,
  toJS
} from 'mobx'

import LoggedUserStore from './LoggedUserStore'

import firebase from 'react-native-firebase'
const firestoreRef = firebase.firestore()

class ContactsStore {
  @observable contacts = []
  @observable searchText = ""

  @action
  async fetchContacts() {

    // Procura todos os Contatos do Usuário Logado
    let userContacts = await firestoreRef
      .collection('users')
      .doc(LoggedUserStore.get().uid)
      .collection('contacts')
      .get();

    // Adiciona os Usuários na Array

    userContacts.forEach(async contact => {
      let uid = contact.data().uid

      if (!this.isContact({ uid })) {
        let contactColletion = await firestoreRef
          .collection('users')
          .doc(uid)
          .get();

        const { name, phone, photoURL, username } = contactColletion.data()

        this.contacts.push({
          contactID: contact.id,
          uid,
          name,
          username: "@" + username,
          phone,
          photoURL
        })

        this.sortContacts();
      }
    })
  }

  isContact({ uid }) {
    let findContact = this.contacts.find(c => c.uid == uid)
    if (findContact) {
      return true
    } else {
      return false
    }
  }

  sortContacts() {
    this.contacts = toJS(this.contacts).sort((a, b) => {
      var x = a.name.toLowerCase();
      var y = b.name.toLowerCase();
      return x < y ? -1 : x > y ? 1 : 0;
    })
  }

  @action
  async addContact(contactData) {
    // Adiciona Contato ao USuário Logado

    const addedContact = {
      uid: contactData.uid,
      addedAt: new Date(Date.now())
    }

    firestoreRef
      .collection('users')
      .doc(LoggedUserStore.get().uid)
      .collection('contacts')
      .add(addedContact)
      .then(async docRef => {

        // Adiciona nas Array de Contatos
        this.contacts.push({
          contactID: docRef.id,
          ...contactData,
          ...addedContact
        })
        this.sortContacts();
      })

  }

  @action
  async removeContact({ uid }) {

    const contactID = this.contacts.find(c => c.uid == uid).contactID;

    // Procura Contato para Deletar
    let deleteContact = await firestoreRef
      .collection('users')
      .doc(LoggedUserStore.get().uid)
      .collection('contacts')
      .doc(contactID)
      .delete();

    // Remove da Array de Usuários
    this.contacts = this.contacts.filter(c => c.uid != uid)
  }

  @action
  search(text) {
    this.searchText = text
  }

  @action
  clearSearch() {
    this.searchText = ""
  }

  @computed
  get searchContacts() {
    // Procura na Array de Contatos o Items Correpondentes
    return this.contacts.filter(contact => {
      let name = contact.name.toLowerCase(),
        username = contact.username.toLowerCase(),
        searchText = this.searchText.toLowerCase()

      return name.includes(searchText)
        || username.includes(searchText)
    })
  }

  @action
  clearStore() {
    this.contacts = []
    this.searchText = ""
  }

}

export default new ContactsStore();