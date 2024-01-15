import { createRouter, createWebHistory } from 'vue-router'
//@ts-ignore
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { ElNotification } from 'element-plus'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/indexLogin.vue'),
      meta: {
        title: `${import.meta.env.VITE_APP_TITLE}-登录`
      }
    },
    {
      path: '/',
      name: 'home',
      component: () => import('@/components/layout/mainLayout.vue'),
      children: [
        {
          path: '/',
          component: () => import('@/views/home/indexHome.vue'),
          meta: {
            title: `${import.meta.env.VITE_APP_TITLE}-首页`
          }
        },
        {
          path: '/sys/menu',
          name: 'menu',
          component: () => import('@/views/sys/sysMenu.vue')
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
  if (to.path == '/login' && localStorage.getItem('token')) {
    return next({ path: '/', replace: true })
  }
  if (to.path != '/login' && !localStorage.getItem('token')) {
    ElNotification.error('登录已失效，请重新登录')
    return next({ path: '/login', replace: true })
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})
export default router
