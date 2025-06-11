import type { paths } from '@/types/Schema'
import { useFetch } from './useFetch'
import type { EditForm, SearchForm, Table } from '@/components/schemaTableForm/types'
import { h, ref } from 'vue'
import DictSelect from '@/components/dictSelect/DictSelect.vue'
import { useDict } from '@/stores/useDict'
import { createEventHook, type UseFetchReturn } from '@vueuse/core'

export const useDictSchema = async <T>(
  code: string,
  editFormSelectPorps?: Record<string, any>,
  searchFormSelectPorps?: Record<string, any>,
  tableData?: Table
) => {
  const { data } = await useDictList(code)
  if (!data.value) throw new Error('字典类型不存在')
  const table: Table = {
    label: data.value.name,
    formatter(row, column, cellValue, index) {
      let value = ''
      for (const item of data.value?.data || []) {
        if (item.value == cellValue) {
          value = item.label
        }
      }
      return value
    },
    exportFormatter(value) {
      return data.value?.data.find((item) => item.value == value)?.label
    }
  }
  if (tableData) {
    Object.assign(table, tableData)
  }

  const defaultSelectPorps = {
    code,
    placeholder: `请选择${data.value.name}`
  }

  const editFormSelectPorpsData = { ...editFormSelectPorps }
  Object.assign(editFormSelectPorpsData, defaultSelectPorps)

  const editForm: EditForm<T> = {
    props: { label: data.value.name },
    rule: [{ required: true, message: `请选择${data.value.name}` }],
    component: h(DictSelect, editFormSelectPorpsData),
    importFormatter(value) {
      return data.value?.data.find((item) => item.label == value)?.value
    }
  }

  const searchFormSelectPorpsData = { ...searchFormSelectPorps }
  Object.assign(searchFormSelectPorpsData, defaultSelectPorps)

  const searchForm: SearchForm = {
    props: {
      label: data.value.name
    },
    component: h(DictSelect, searchFormSelectPorpsData)
  }

  return {
    table,
    editForm,
    searchForm
  }
}

export const useDictList = (code: string) => {
  if (useDict().dictMap.has(code)) {
    const isFetching = ref(true)
    const simulateFetch = createEventHook()
    const data = ref<
      paths['/admin/sys/dictType/code']['get']['responses']['200']['content']['application/json']
    >(useDict().dictMap.get(code)!)
    simulateFetch.trigger(data.value)
    isFetching.value = false
    return { data, onFetchFinally: simulateFetch.on, isFetching } as UseFetchReturn<
      paths['/admin/sys/dictType/code']['get']['responses']['200']['content']['application/json']
    > &
      PromiseLike<
        UseFetchReturn<
          paths['/admin/sys/dictType/code']['get']['responses']['200']['content']['application/json']
        >
      >
  }
  return useFetch<
    paths['/admin/sys/dictType/code']['get']['responses']['200']['content']['application/json']
  >(`/admin/sys/dictType/code?code=${code}`).get()
}
