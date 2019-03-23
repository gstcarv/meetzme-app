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

  get(){
    return this.info;
  }

}

export default new LoggedUserStore();