<template>
  <iframe width="100%" ref="iframe" :src="src" frameborder="0" scrolling="auto"></iframe>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const iframe = ref()

onMounted(() => {
  setHeight()
})

const setHeight = () => {
  const main = document.getElementById('main')
  if (!main) return
  iframe.value.height = `${main.offsetHeight - 46}px`
}

window.onresize = () => {
  setHeight()
}

const src = computed(() => {
  console.log('🚀 ~ src ~ route.path:', route.path.substring(1))
  return decodeURIComponent(route.path.substring(1))
})
</script>

<style scoped></style>
