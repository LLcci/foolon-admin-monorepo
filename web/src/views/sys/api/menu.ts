import { useFetch } from '@/hooks/useFetch'
import type { paths } from '@/types/Schema'

export const useMenuList = () => {
  return useFetch<
    paths['/admin/sys/menu/list']['post']['responses']['200']['content']['application/json']
  >('/admin/sys/menu/list').post()
}

export const useInterfaceRoutes = () => {
  return useFetch<
    paths['/admin/sys/menu/routes']['get']['responses']['200']['content']['application/json']
  >('/admin/sys/menu/routes').get()
}
