import { useFetch } from '@/hooks/useFetch'
import router from '@/router'
import { socket } from '@/sockets'
import type { paths } from '@/types/Schema'
import type { UserMenuTreeType } from '@/types/UserMenuTree'
import type { UseFetchReturn } from '@vueuse/core'
import { uniqBy } from 'lodash-es'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

export const useUser = defineStore(
  'user',
  (): {
    token: Ref<string | null>
    userInfo: Ref<
      paths['/admin/sys/permission']['get']['responses']['200']['content']['application/json']
    >
    userMenus: Ref<
      paths['/admin/sys/menu/id']['get']['responses']['200']['content']['application/json'][]
    >
    userPerms: Ref<string[]>
    userMenuTree: Ref<UserMenuTreeType[]>
    userRoutes: Ref<RouteRecordRaw[]>
    userKeepAliveRoutes: Ref<string[]>
    initToken: () => void
    setToken: (value: string) => void
    delToken: () => void
    getPermissions: () => Promise<void>
    updateUserInfo: (
      info: paths['/admin/sys/permission/userInfo']['post']['requestBody']['content']['application/json']
    ) => UseFetchReturn<
      paths['/admin/sys/permission/userInfo']['post']['responses']['200']['content']['application/json']
    >
    updatePassword: (
      data: paths['/admin/sys/permission/updatePassword']['post']['requestBody']['content']['application/json']
    ) => UseFetchReturn<
      paths['/admin/sys/permission/updatePassword']['post']['responses']['200']['content']['application/json']
    >
    logout: () => UseFetchReturn<unknown>
  } => {
    const token = ref<string | null>(null)

    const userInfo = ref<
      paths['/admin/sys/permission']['get']['responses']['200']['content']['application/json']
    >({
      password: '',
      roles: []
    })

    const userMenus = ref<
      paths['/admin/sys/menu/id']['get']['responses']['200']['content']['application/json'][]
    >([])

    const userPerms = ref<string[]>([])

    const userMenuTree = ref<UserMenuTreeType[]>([])

    const userRoutes = ref<RouteRecordRaw[]>([])

    const userKeepAliveRoutes = ref<string[]>([])

    function initToken() {
      token.value = localStorage.getItem('token')
    }

    function setToken(value: string) {
      localStorage.setItem('token', value)
      token.value = value
    }

    function delToken() {
      localStorage.removeItem('token')
      token.value = null
    }

    async function getPermissions() {
      userRoutes.value = []
      userKeepAliveRoutes.value = []
      userMenuTree.value = []
      userPerms.value = []
      const { data } =
        await useFetch<
          paths['/admin/sys/permission']['get']['responses']['200']['content']['application/json']
        >('/admin/sys/permission').get()
      if (data.value) {
        userInfo.value = data.value
        data.value.roles.forEach((item) => {
          userMenus.value = item.menus.filter((item) => item.menuType != 2)
          item.menus.forEach((item) => {
            if (item.perms?.length) {
              // 权限
              userPerms.value.push(...item.perms)
            }
            if (item.menuType != 2 && item.path && item.component) {
              // 子菜单
              const module = import.meta.glob('/src/views/**/*.vue')
              const route: RouteRecordRaw = {
                path: item.path,
                name: item.path,
                component: module[`/src/views${item.component}`],
                meta: {
                  title: item.name
                }
              }
              userRoutes.value.push(route)
              if (item.keepalive == 1) {
                // 缓存菜单
                const componentName = item.component?.split('.')[0].split('/').at(-1)
                if (componentName) userKeepAliveRoutes.value.push(componentName)
              }
            }
          })
        })
        // 添加路由
        userRoutes.value = uniqBy(userRoutes.value, 'path')
        userRoutes.value.forEach((route) => {
          router.addRoute('main', route)
          if (router.currentRoute.value.path == route.path) {
            router.replace(route.path)
          }
        })
        // 菜单数
        userMenus.value = uniqBy(userMenus.value, 'id')
        getSubMenuTree(userMenuTree.value, userMenus.value)
        if (!socket.connected) {
          socket.auth = { token: `Bearer ${token.value}` }
          socket.connect()
        }
      }
    }

    function getSubMenuTree(
      menuTree: UserMenuTreeType[],
      list: paths['/admin/sys/menu/list']['post']['responses']['200']['content']['application/json'],
      temp?: UserMenuTreeType
    ) {
      list?.forEach((item) => {
        const tree: UserMenuTreeType = {
          id: item.id as string,
          index: item.path,
          name: item.name as string,
          icon: item.icon ?? undefined,
          children: []
        }
        const temPid = item.parentId
        if (!temp && !item.parentId) {
          menuTree.push(tree)
          if (list.filter((i) => i.parentId === item.id).length) {
            getSubMenuTree(menuTree, list, tree)
          }
        } else if (temp && item.parentId && temPid == temp.id) {
          temp.children.push(tree)
          if (list.filter((i) => i.parentId === item.id).length) {
            getSubMenuTree(menuTree, list, tree)
          }
        }
      })
    }

    function updateUserInfo(
      info: paths['/admin/sys/permission/userInfo']['post']['requestBody']['content']['application/json']
    ) {
      return useFetch<
        paths['/admin/sys/permission/userInfo']['post']['responses']['200']['content']['application/json']
      >('/admin/sys/permission/userInfo', { immediate: false }).post(info)
    }

    function updatePassword(
      data: paths['/admin/sys/permission/updatePassword']['post']['requestBody']['content']['application/json']
    ) {
      return useFetch<
        paths['/admin/sys/permission/updatePassword']['post']['responses']['200']['content']['application/json']
      >('/admin/sys/permission/updatePassword', { immediate: false }).post(data)
    }

    function logout() {
      return useFetch('/admin/sys/logout', { immediate: false }).get()
    }

    return {
      token,
      userInfo,
      userMenus,
      userPerms,
      userMenuTree,
      userRoutes,
      userKeepAliveRoutes,
      initToken,
      setToken,
      delToken,
      getPermissions,
      updateUserInfo,
      updatePassword,
      logout
    }
  }
)
