import {
  observable,
  action,
  autorun,
  computed,
  configure
} from 'mobx'

import firebase from 'react-native-firebase'

class ContactsStore {
  @observable contacts = []
  @observable contactsID = []
  @observable searchText = ''

  @action
  async fetchContacts(userID) {
    let userContacts = await firebase.firestore()
      .collection('users')
      .doc(userID)
      .collection('contacts')
      .get();

    userContacts.forEach(async contact => {
      let uid = contact.data().uid;
      if (!this.contactsID.includes(uid)) {
        this.contactsID.push(uid)

        let contact = await firebase.firestore()
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

        console.log("FROM STORE", this.contacts)

      }
    })
  }

  @action
  addContact(contact) {
    this.contacts.push(contact)
    console.log(this.contacts[0].name)
  }

  @action
  search(text){
    this.searchText = text
  }  

  @computed
  get searchContacts() {
    return this.contacts.filter(contact => {
      let name = contact.name.toLowerCase(),
        username = contact.username.toLowerCase()

      return name.includes(this.searchText)
        || username.includes(this.searchText)
    })
  }

}

export default new ContactsStore();