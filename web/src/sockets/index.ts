import { Socket, io } from 'socket.io-client'
import { ElNotification } from 'element-plus'

export const socket: Socket = io(import.meta.env.VITE_WS_URL, {
  transports: ['websocket'],
  withCredentials: true,
  auth: {
    token: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : undefined
  }
})

socket.on('connect_error', () => {
  ElNotification.error('服务器无法访问')
})

socket.on('message', (message) => {
  ElNotification.info({ title: '消息', message, duration: 0 })
})
