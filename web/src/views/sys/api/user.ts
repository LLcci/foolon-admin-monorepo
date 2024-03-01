import { useFetch } from '@/hooks/useFetch'

export const useAvatarDelete = (filename: string) => {
  return useFetch(`/admin/sys/user/deleteAvatar?filename=${filename}`).get()
}
