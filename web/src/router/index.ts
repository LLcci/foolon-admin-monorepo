import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/components/layout/mainLayout.vue'),
      children: [
        {
          path: '/',
          component: () => import('@/views/home/indexHome.vue')
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

export default router
