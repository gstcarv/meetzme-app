import {
  observable,
  action
} from 'mobx'

import LoggedUserStore from 'mobx'

class EventsStore {
  @observable events = []
  
}