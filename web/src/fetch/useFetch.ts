import { createFetch } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { ElNotification, ElMessage } from 'element-plus'

const router = useRouter()

export const useFetch = createFetch({
  baseUrl: import.meta.env.VITE_API_URL,
  options: {
    async beforeFetch({ options }) {
      const token = localStorage.getItem('token')
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`
      }
      return { options }
    },
    async onFetchError(ctx) {
      if (ctx.data.code === 401) {
        localStorage.removeItem('token')
        router.replace('/login')
        ElNotification.error({ message: ctx.data.message })
      } else {
        ElMessage.error(ctx.data.message)
      }
      return ctx
    }
  }
})
