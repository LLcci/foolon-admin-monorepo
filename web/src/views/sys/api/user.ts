import { useFetch } from '@/hooks/useFetch'

export const useAvatarDelete = (filename: string) => {
  return useFetch(`/sys/user/deleteAvatar?filename=${filename}`).get()
}
