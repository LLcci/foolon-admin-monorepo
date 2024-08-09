import { useFetch } from '@/hooks/useFetch'

export const useImgDelete = (filename: string) => {
  return useFetch(`/admin/sys/upload/delete?filename=${filename}`).get()
}
