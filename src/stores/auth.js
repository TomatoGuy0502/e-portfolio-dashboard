import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state() {
    return { 
      userId: null,
      userName: ''
    }
  },
  getters: {
    isLogined() {
      return !!this.userId
    }
  },
  actions: {
    login() {
      this.userId = 'a733fe71c012'
      this.userName = 'Bob'
    },
    logout() {
      this.userId = null
      this.userName = ''
    },
  },
})
