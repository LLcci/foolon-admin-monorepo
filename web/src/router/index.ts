import { createRouter, createWebHashHistory } from 'vue-router'
//@ts-ignore
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useUser } from '@/stores/useUser'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
      redirect: '/index',
      children: [
        {
          path: '/index',
          component: () => import('@/views/home/IndexHome.vue'),
          meta: {
            title: '首页'
          }
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.meta.title) {
    document.title = `${import.meta.env.VITE_APP_TITLE}-${to.meta.title}`
  }
  if (to.path == '/login' && useUser().token) {
    return next({ path: '/', replace: true })
  }
  if (to.path != '/login' && !useUser().token) {
    return next({ path: '/login', replace: true })
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})
export default router
