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
</script>
<style scoped></style>
