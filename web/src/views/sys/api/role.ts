import { useFetch } from '@/hooks/useFetch'
import type { paths } from '@/types/Schema'

export const useRoleList = () => {
  return useFetch<
    paths['/admin/sys/role/list']['post']['responses']['200']['content']['application/json']
  >('/sys/role/list').post()
}
