import { useFetch } from '@/hooks/useFetch'
import type { FormModel, PageRequest } from '@/types'

export const tableList = (url: string, data: Record<string, any>) => {
  return useFetch<PageRequest<FormModel[]>>(url, { immediate: false }).post(data)
}

export const tableSave = (url: string, data: Record<string, any>) => {
  return useFetch<FormModel[]>(url, { immediate: false }).post(data)
}

export const tableId = (url: string, id: string) => {
  return useFetch<FormModel>(`${url}?id=${id}`).get()
}

export const tableDelete = (url: string, data: Record<string, any>) => {
  return useFetch(url).post(data)
}

export const tableExport = (url: string, data: Record<string, any>) => {
  return useFetch<FormModel[]>(url, { immediate: false }).post(data)
}
