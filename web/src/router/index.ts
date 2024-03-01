import { createRouter, createWebHistory } from 'vue-router'
//@ts-ignore
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { ElNotification } from 'element-plus'
import { useUser } from '@/stores/useUser'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/IndexLogin.vue'),
      meta: {
        title: `${import.meta.env.VITE_APP_TITLE}-登录`
      }
    },
    {
      path: '/',
      name: 'main',
      component: () => import('@/components/layout/MainLayout.vue'),
      children: [
        {
          path: '/',
          component: () => import('@/views/home/IndexHome.vue'),
          meta: {
            title: `${import.meta.env.VITE_APP_TITLE}-首页`
          }
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
  if (to.path == '/login' && useUser().token) {
    return next({ path: '/', replace: true })
  }
  if (to.path != '/login' && !useUser().token) {
    ElNotification.error('登录已失效，请重新登录')
    return next({ path: '/login', replace: true })
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})
export default router
