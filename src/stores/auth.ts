import { defineStore } from 'pinia'
import { login as loginAPI, checkToken as checkTokenAPI } from '@/api/auth'

export const useAuthStore = defineStore('auth', {
  state() {
    return { 
      tokenStr: localStorage.getItem('auth') || '',
      error: null as any,
      isPending: false
    }
  },
  getters: {
    isLogined(): boolean {
      return !!this.tokenStr
    }
  },
  actions: {
    async login({ userId, password }: { userId: string, password: string}) {
      try {
        this.isPending = true
        this.error = null

        const { data } = await loginAPI({ userId, password })
        console.log(data)
        this.setToken(data.tokenStr)
      } catch (err) {
        this.error = err
      } finally {
        this.isPending = false
      }
    },
    async isTokenValid() {
      try {
        await checkTokenAPI()
        return true
      } catch (err) {
        this.logout()
        return false
      }
    },
    logout() {
      localStorage.removeItem('auth')
      this.tokenStr = ''
    },
    setToken(token: string) {
      this.tokenStr = token
      localStorage.setItem('auth', token)
    }
  },
})
