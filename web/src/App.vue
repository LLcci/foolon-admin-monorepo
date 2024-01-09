<template>
  <RouterView />
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useSystem } from './stores/useSystem'

useSystem().checkOrientationResize()

window.onresize = () => {
  useSystem().checkOrientationResize()
}

import { socket } from './sockets'
import { onMounted } from 'vue'
// socket连接起来
socket.connect()

// 组件挂载完毕完成后，监听onMessage事件
onMounted(() => {
  socket.on('onMessage', (e) => {
    console.log(e)
  })
  socket.emit('events', 'vue')
})
</script>
<style scoped></style>
