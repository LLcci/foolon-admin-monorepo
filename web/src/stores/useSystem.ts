import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useWindowSize } from '@vueuse/core'

export const useSystem = defineStore('system', () => {
  const orientation = ref<'Portrait' | 'Landscape'>('Landscape')

  function checkOrientationResize() {
    const { width, height } = useWindowSize()
    if (width.value < height.value) {
      orientation.value = 'Portrait'
    } else {
      orientation.value = 'Landscape'
    }
  }

  return { orientation, checkOrientationResize }
})
