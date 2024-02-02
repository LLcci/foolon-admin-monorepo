import { useFetch } from '@/hooks/useFetch'
import type { paths } from '@/types/Schema'

export const useMenuList = () => {
  return useFetch<
    paths['/admin/sys/menu/list']['post']['responses']['200']['content']['application/json']
  >('/sys/menu/list').post()
}
