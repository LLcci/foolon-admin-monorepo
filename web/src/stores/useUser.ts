import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUser = defineStore('user', () => {
  const token = ref<string | null>(null)

  function setToken(value: string) {
    localStorage.setItem('token', value)
    token.value = value
  }

  function delToken() {
    localStorage.removeItem('token')
    token.value = null
  }

  return {
    token,
    setToken,
    delToken
  }
})
