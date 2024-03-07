import router from '@/router'
import { useUser } from '@/stores/useUser'
import { createFetch } from '@vueuse/core'
import { ElNotification, ElMessage } from 'element-plus'

export const useFetch = createFetch({
  baseUrl: import.meta.env.VITE_API_URL,
  options: {
    async beforeFetch({ options }) {
      const token = useUser().token
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`
      }
      return { options }
    },
    async afterFetch(ctx) {
      ctx.data = JSON.parse(ctx.data).data
      return ctx
    },
    async onFetchError(ctx) {
      if (ctx.data) {
        const data = JSON.parse(ctx.data)
        if (data.code == 401) {
          ElNotification.error({ message: data.message })
          useUser().delToken()
          useUser().$reset()
          router.replace('/login')
        } else {
          ElMessage.error(data.message)
        }
      } else {
        ElNotification.error(ctx.error.message)
      }
      return ctx
    }
  }
})
