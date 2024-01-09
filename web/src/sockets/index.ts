import { reactive } from 'vue'
import { Socket, io } from 'socket.io-client'

export const state = reactive<{
  connected: boolean
  fooEvents: Array<any>
  barEvents: Array<any>
}>({
  connected: false,
  fooEvents: [],
  barEvents: []
})

export const socket: Socket = io(import.meta.env.VITE_WS_URL, {
  transports: ['websocket'],
  withCredentials: true
})

socket.on('connect', () => {
  state.connected = true
})

socket.on('disconnect', () => {
  state.connected = false
})

socket.on('foo', (...args) => {
  state.fooEvents.push(args)
})

socket.on('bar', (...args) => {
  state.barEvents.push(args)
})
