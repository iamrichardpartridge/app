
import {Store, PENDING} from '../flux'

export default class UserStore extends Store {
  constructor() {
    super()
    this.loggedout = false
    this.token = null
    this.value = null
  }
}

UserStore.handlers = {
  user: {
    login(token) {
      this.token = token
      this.changed('token')
      if (this.value === null) {
        this.value = PENDING
        this.creators.user.fetch(this.token)
      }
    },
    gotUser(user) {
      this.value = user
      this.changed()
    },
    logout() {
      this.loggedout = true
      this.changed()
    },
  }
}

UserStore.getters = {
  loggedout() {
    return this.loggedout
  },
  value() {
    if (this.value === null) {
      if (this.token === null) {
        this.token = PENDING
        this.creators.user.login()
      } else if (this.token !== PENDING) {
        this.value = PENDING
        this.creators.user.fetch(this.token)
      }
    }
    return this.value
  },
  token() {
    if (this.token === null) {
      this.token = PENDING
      this.creators.user.login()
    }
    return this.token
  },
}
