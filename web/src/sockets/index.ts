import { reactive } from 'vue'
import { Socket, io } from 'socket.io-client'
import { ElNotification } from 'element-plus'

export const state = reactive<{
  connected: boolean
}>({
  connected: false
})

export const socket: Socket = io(import.meta.env.VITE_WS_URL, {
  transports: ['websocket'],
  withCredentials: true
})

socket.on('connect', () => {
  state.connected = true
})

socket.on('connect_error', () => {
  ElNotification.error('服务器无法访问')
})

socket.on('disconnect', () => {
  state.connected = false
  ElNotification.error('服务器连接已断开')
})
