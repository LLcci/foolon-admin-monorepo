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
import {
  ElAutocomplete,
  ElCascader,
  ElColorPicker,
  ElDatePicker,
  ElInput,
  ElInputNumber,
  ElRate,
  ElSelect,
  ElSlider,
  ElSwitch,
  ElTimePicker,
  ElTimeSelect,
  ElTransfer,
  ElTree,
  ElUpload,
  ElTreeSelect,
  ElOption
} from 'element-plus'

socket.connect()

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.component('ElAutocomplete', ElAutocomplete)
app.component('ElCascader', ElCascader)
app.component('ElColorPicker', ElColorPicker)
app.component('ElDatePicker', ElDatePicker)
app.component('ElInput', ElInput)
app.component('ElInputNumber', ElInputNumber)
app.component('ElRate', ElRate)
app.component('ElSelect', ElSelect)
app.component('ElSlider', ElSlider)
app.component('ElSwitch', ElSwitch)
app.component('ElTimePicker', ElTimePicker)
app.component('ElTimeSelect', ElTimeSelect)
app.component('ElTransfer', ElTransfer)
app.component('ElTree', ElTree)
app.component('ElTreeSelect', ElTreeSelect)
app.component('ElUpload', ElUpload)
app.component('ElOption', ElOption)

app.use(createPinia())
app.use(router)

app.mount('#app')
