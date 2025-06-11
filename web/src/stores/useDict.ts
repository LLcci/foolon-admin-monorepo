import { useFetch } from '@/hooks/useFetch'
import type { paths } from '@/types/Schema'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDict = defineStore('dict', () => {
  const dictMap = ref<
    Map<
      string,
      paths['/admin/sys/dictType/code']['get']['responses']['200']['content']['application/json']
    >
  >(
    new Map<
      string,
      paths['/admin/sys/dictType/code']['get']['responses']['200']['content']['application/json']
    >()
  )

  const initDictMap = async () => {
    const { data } =
      await useFetch<
        paths['/admin/sys/dictType/all']['get']['responses']['200']['content']['application/json']
      >('/admin/sys/dictType/all').get()
    if (data.value) {
      dictMap.value = new Map()
      for (const item of data.value) {
        dictMap.value.set(item.code, item)
      }
    }
  }

  return { dictMap, initDictMap }
})
