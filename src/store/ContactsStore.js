import {
  observable,
  action,
  autorun,
  computed,
  configure
} from 'mobx'

import firebase from 'react-native-firebase'
const firestoreRef = firebase.firestore()

class ContactsStore {
  @observable contacts = []
  @observable contactsID = []
  @observable searchText = ""

  @action
  async fetchContacts(userID) {
    // Procura todos os Contatos do Usuário Logado
    let userContacts = await firestoreRef
      .collection('users')
      .doc(userID)
      .collection('contacts')
      .get();

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
      }
    })
  }

  @action
  async addContact(contactData, loggedUserID) {
    try {
      // Adiciona Contato ao USuário Logado
      await firestoreRef
        .collection('users')
        .doc(loggedUserID)
        .collection('contacts')
        .add({
          uid: contactData.id,
          addedAt: new Date(Date.now())
        })

      // Adiciona nas Array de Contatos
      this.contactsID.push(contactData.id)
      this.contacts.push(contactData)
    } catch (e) { }
  }

  @action
  async removeContact(contactToRemove, loggedUserID) {
    try {
      // Procura Contato para Deletar
      let deleteContact =
        await firestoreRef
          .collection('users')
          .doc(loggedUserID)
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
      });
    } catch (e) { }
  }

  @action
  search(text) {
    this.searchText = text
  }

  @computed
  get searchContacts() {
    // Procura na Array de Contatos o Items Correpondentes
    return this.contacts.filter(contact => {
      let name = contact.name.toLowerCase(),
        username = contact.username.toLowerCase()

      return name.includes(this.searchText)
        || username.includes(this.searchText)
    })
  }

}

export default new ContactsStore();