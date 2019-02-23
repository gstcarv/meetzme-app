import {
  observable,
  action
} from 'mobx'

class LoggedUserStore {
  @observable info = {}
  
  @action
  setUser(data){
    this.info = data
  }

}

export default new LoggedUserStore();