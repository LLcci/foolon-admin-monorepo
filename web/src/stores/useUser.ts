import { useFetch } from '@/hooks/useFetch'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUser = defineStore('user', () => {
  const token = ref<string | null>(null)

  function initToken() {
    token.value = localStorage.getItem('token')
  }

  function setToken(value: string) {
    localStorage.setItem('token', value)
    token.value = value
  }

  function delToken() {
    localStorage.removeItem('token')
    token.value = null
  }

  function getPermissions() {
    return useFetch('/sys/permission').get()
  }

  return {
    token,
    initToken,
    setToken,
    delToken,
    getPermissions
  }
})
