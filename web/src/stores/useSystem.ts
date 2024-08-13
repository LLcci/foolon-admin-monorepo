import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useWindowSize } from '@vueuse/core'

export const useSystem = defineStore('system', () => {
  const breakpoints = ref<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('sm')

  function checkBreakpointsResize() {
    const { width } = useWindowSize()
    breakpoints.value = 'xs'
    if (width.value >= 768) {
      breakpoints.value = 'sm'
    }
    if (width.value >= 992) {
      breakpoints.value = 'md'
    }
    if (width.value >= 1200) {
      breakpoints.value = 'lg'
    }
    if (width.value >= 1920) {
      breakpoints.value = 'xl'
    }
  }

  return { breakpoints, checkBreakpointsResize }
})
