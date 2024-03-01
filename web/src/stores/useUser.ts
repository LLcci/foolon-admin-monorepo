import { useFetch } from '@/hooks/useFetch'
import router from '@/router'
import type { paths } from '@/types/Schema'
import type { UserMenuTreeType } from '@/types/UserMenuTree'
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
    initToken: () => void
    setToken: (value: string) => void
    delToken: () => void
    getPermissions: () => Promise<void>
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
      const { data } =
        await useFetch<
          paths['/admin/sys/permission']['get']['responses']['200']['content']['application/json']
        >('/admin/sys/permission').get()
      if (data.value) {
        userInfo.value = data.value
        data.value.roles.forEach((item) => {
          userMenus.value.push(...item.menus.filter((item) => item.menuType != 2))
          item.menus.forEach((item) => {
            if (item.perms) {
              userPerms.value.push(...item.perms)
            }
            if (item.menuType != 2 && item.path) {
              const module = import.meta.glob('/src/views/**/*.vue')
              const route: RouteRecordRaw = {
                path: item.path,
                name: item.path,
                component: module[`/src/views${item.component}`],
                meta: {
                  title: `${import.meta.env.VITE_APP_TITLE}-${item.name}`
                }
              }
              userRoutes.value.push(route)
            }
          })
        })
        useUser().userRoutes.forEach((route) => {
          router.addRoute('main', route)
          if (router.currentRoute.value.path == route.path) {
            router.replace(route.path)
          }
        })
        getSubMenuTree(userMenuTree.value, userMenus.value)
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

    return {
      token,
      userInfo,
      userMenus,
      userPerms,
      userMenuTree,
      userRoutes,
      initToken,
      setToken,
      delToken,
      getPermissions
    }
  }
)
