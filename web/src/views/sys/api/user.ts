import { useFetch } from '@/hooks/useFetch'
import type { paths } from '@/types/Schema'

export const useImgDelete = (filename: string) => {
  return useFetch(`/admin/sys/upload/delete?filename=${filename}`).get()
}

export const useUserList = (
  data?: paths['/admin/sys/user/list']['post']['requestBody']['content']['application/json']
) => {
  return useFetch<
    paths['/admin/sys/user/list']['post']['responses']['200']['content']['application/json']
  >('/admin/sys/user/list').post(data)
}
