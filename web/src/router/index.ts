import { createRouter, createWebHashHistory } from 'vue-router'
//@ts-ignore
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useUser } from '@/stores/useUser'
import { useDict } from '@/stores/useDict'

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

router.beforeEach(async (to, from, next) => {
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
  // 刷新或首次进入时加载权限和字典（登录页已自行加载，此处通过 userRoutes 判空避免重复）
  if (useUser().token && useUser().userRoutes.length === 0) {
    await Promise.all([useUser().getPermissions(), useDict().initDictMap()])
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})
export default router
