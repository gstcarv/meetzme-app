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
  @observable contactsID = []
  @observable searchText = ""

  @action
  async fetchContacts() {

    // Procura todos os Contatos do Usuário Logado
    let userContacts = await firestoreRef
      .collection('users')
      .doc(LoggedUserStore.get().uid)
      .collection('contacts')
      .get();

    console.tron.log("CONTACT_STORE", LoggedUserStore.get().uid)

    // Adiciona os Usuários na Array
    userContacts.forEach(async contact => {
      let uid = contact.data().uid
      if (!this.contactsID.includes(uid)) {
        this.contactsID.push(uid)

        let contact = await firestoreRef
          .collection('users')
          .doc(uid)
          .get();

        const { name, phone, photoURL, username } = contact.data()

        this.contacts.push({
          id: contact.id,
          name,
          username: "@" + username,
          phone,
          photoURL
        })

        this.sortContacts();
      }
    })
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
    await firestoreRef
      .collection('users')
      .doc(LoggedUserStore.get().uid)
      .collection('contacts')
      .add({
        uid: contactData.id,
        addedAt: new Date(Date.now())
      })

    // Adiciona nas Array de Contatos
    this.contactsID.push(contactData.id)
    this.contacts.push(contactData)

    this.sortContacts();
  }

  @action
  async removeContact(contactToRemove) {
    try {
      // Procura Contato para Deletar
      let deleteContact =
        await firestoreRef
          .collection('users')
          .doc(LoggedUserStore.get().uid)
          .collection('contacts')
          .where("uid", "==", contactToRemove.id)
          .get();

      deleteContact.forEach(async doc => {
        // Remove da Array de Usuários
        this.contacts = this.contacts.filter(contact => {
          return contact.id != contactToRemove.id
        })

        // Remove da Array de IDS dos Usuários
        let idIndex = this.contactsID.indexOf(contactToRemove.id)
        this.contactsID.splice(idIndex, 1)

        // Remove do Banco
        await doc.ref.delete()

        this.sortContacts();

      });
    } catch (e) { }
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
  clearStore(){
    this.contacts = []
    this.contactsID = []
    this.searchText = ""
  }

}

export default new ContactsStore();