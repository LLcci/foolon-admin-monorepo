import { useFetch } from '@/hooks/useFetch'
import type { paths } from '@/types/Schema'

export function useLogin(
  data: paths['/admin/sys/login']['post']['requestBody']['content']['application/json']
) {
  return useFetch<
    paths['/admin/sys/login']['post']['responses']['200']['content']['application/json']
  >('/admin/sys/login', { immediate: false }).post(data)
}
