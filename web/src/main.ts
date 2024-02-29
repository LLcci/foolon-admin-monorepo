import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'normalize.css'

import 'virtual:uno.css'

import 'element-plus/dist/index.css'
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/message-box/style/css'
import 'element-plus/es/components/notification/style/css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import '@/styles/globalClass.scss'

import { socket } from './sockets'
import { permissions } from './hooks/useDirectives'

import { useUser } from './stores/useUser'

socket.connect()

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(createPinia())
useUser().initToken()

if (useUser().token) {
  await useUser().getPermissions()
}

app.use(router)

app.directive('permissions', permissions)

app.mount('#app')
