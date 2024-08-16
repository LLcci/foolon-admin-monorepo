import { useFetch } from '@/hooks/useFetch'
import type { paths } from '@/types/Schema'

export const useQueuesId = (id: string) => {
  return useFetch<
    paths['/admin/sys/queues/id']['get']['responses']['200']['content']['application/json']
  >(`/admin/sys/queues/id?id=${id}`).get()
}

export const useConsumerMethod = () => {
  return useFetch<
    paths['/admin/sys/queues/consumerMethod']['get']['responses']['200']['content']['application/json']
  >('/admin/sys/queues/consumerMethod').get()
}
