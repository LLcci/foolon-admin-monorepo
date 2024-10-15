<template>
  <el-container class="min-h-screen safe-area">
    <el-header
      ref="headerRef"
      height="fit-content(height)"
      class="bg-$el-color-primary color-$el-color-white"
    >
      <div class="flex justify-between">
        <div class="flex items-center h-10 sm:h-15">
          <img class="w-6 sm:w-8" src="/favicon.svg" alt="" />
          <span class="ml-2 font-bold xs:font-size-sm sm:font-size-lg">{{ title }}</span>
          <div class="xs:hidden sm:block">
            <el-button type="primary" size="small" @click="() => (isCollapse = !isCollapse)">
              <el-icon v-if="!isCollapse" :size="20"><Fold /></el-icon>
              <el-icon v-else :size="20"><Expand /></el-icon>
            </el-button>
          </div>
          <el-button type="primary" size="small" @click="toggleDark()">
            <el-icon v-if="isDark" :size="20"> <Sunny /></el-icon>
            <el-icon v-else :size="20"> <Moon /></el-icon>
          </el-button>
        </div>
        <div class="flex items-center xs:h-10 sm:h-15 justify-between">
          <div class="flex items-center">
            <el-avatar :size="useSystem().breakpoints == 'xs' ? 24 : 30" :src="userAvatar" />
            <div class="max-w-30 ml-2 font-size-base font-bold truncate xs:hidden sm:block">
              {{ useUser().userInfo.realname }}
            </div>
          </div>
          <div class="ml-2 xs:hidden lg:block">
            <el-dropdown trigger="click">
              <el-button type="primary" size="large" :icon="Setting">设置</el-button>
              <el-button type="primary" size="small"
                ><el-icon :size="20"><Setting /></el-icon
              ></el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="showUserInfo = true">用户信息</el-dropdown-item>
                  <el-dropdown-item @click="showUpdatePassword = true">修改密码</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
          <div class="ml-2 xs:block lg:hidden">
            <el-dropdown trigger="click">
              <el-button type="primary" size="small"
                ><el-icon :size="20"><Setting /></el-icon
              ></el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="showUserInfo = true">用户信息</el-dropdown-item>
                  <el-dropdown-item @click="showUpdatePassword = true">修改密码</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
          <div class="xs:hidden lg:block">
            <el-button type="primary" size="large" :icon="SwitchButton" @click="logout"
              >退出登录</el-button
            >
          </div>
          <div class="xs:block lg:hidden">
            <el-button type="primary" size="small" @click="logout"
              ><el-icon :size="20"><SwitchButton /></el-icon
            ></el-button>
          </div>
        </div>
      </div>
    </el-header>
    <el-container>
      <el-aside
        class="border-r-1px border-r-solid border-r-$el-border-color shadow-lg xs:hidden sm:block"
        width="fit-content(width)"
      >
        <el-scrollbar :height="menuHeight">
          <el-menu :default-active="route.path" :collapse="isCollapse" @select="handleSelect">
            <el-menu-item index="/index">
              <el-icon><House /></el-icon>
              <template #title>
                <span class="w-30 overflow-hidden text-nowrap text-ellipsis">首页</span>
              </template>
            </el-menu-item>
            <UserMenuTree :user-menu-tree="useUser().userMenuTree"></UserMenuTree>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-container>
        <el-header height="fit-content(height)">
          <div class="xs:hidden sm:block">
            <el-tabs
              class="mt-3"
              v-model="activeTab"
              @edit="handleTabsEdit"
              @tab-change="handleTabsChange"
              closable
            >
              <el-tab-pane
                v-for="(item, index) in editableTabs"
                :key="index"
                :label="item.label"
                :name="item.name"
              ></el-tab-pane>
            </el-tabs>
          </div>
          <div
            class="border-b-1px border-b-solid border-b-$el-border-color items-center h-10 xs:flex sm:hidden"
            @click="() => (drawer = !drawer)"
          >
            <el-icon :size="20"><Menu /></el-icon>
            <div class="ml-2">
              <el-text>菜单</el-text>
            </div>
          </div>
        </el-header>
        <el-main>
          <div class="h-full flex">
            <el-card ref="viewBody" id="main" class="flex-1 pos-relative">
              <router-view v-slot="{ Component }">
                <keep-alive :include="useUser().userKeepAliveRoutes">
                  <component :is="Component" />
                </keep-alive>
              </router-view>
            </el-card>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
  <!-- 移动端菜单 -->
  <el-drawer v-model="drawer" title="菜单" direction="ltr" size="100%">
    <el-menu :default-active="route.path" @select="handleAppSelect">
      <el-menu-item index="/index">
        <el-icon><House /></el-icon>
        <template #title>
          <span>首页</span>
        </template>
      </el-menu-item>
      <UserMenuTree :user-menu-tree="useUser().userMenuTree"></UserMenuTree>
    </el-menu>
  </el-drawer>
  <!-- 用户信息 -->
  <el-drawer
    v-model="showUserInfo"
    title="用户信息"
    direction="rtl"
    :size="useSystem().breakpoints == 'xs' ? '100%' : '30%'"
  >
    <schemaForm
      v-loading="confirmUserInfoLoading"
      ref="userInfoFormRef"
      v-model="userInfoFormModel"
      :form="userInfoForm"
    ></schemaForm>
    <template #footer>
      <div>
        <el-button @click="showUserInfo = false">取消</el-button>
        <el-button type="primary" :loading="confirmUserInfoLoading" @click="confirmUserInfo"
          >提交</el-button
        >
      </div>
    </template>
  </el-drawer>
  <el-dialog
    v-model="showUpdatePassword"
    :fullscreen="useSystem().breakpoints == 'xs'"
    title="修改密码"
  >
    <schemaForm
      v-loading="updatePasswordLoading"
      ref="updatePasswordFormRef"
      v-model="updatePasswordFormModel"
      :form="updatePasswordForm"
    ></schemaForm>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showUpdatePassword = false">取消</el-button>
        <el-button type="primary" :loading="updatePasswordLoading" @click="confirmUpdatePassword"
          >提交</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { RouterView, useRoute, useRouter } from 'vue-router'
import { useDark, useToggle } from '@vueuse/core'
import { SwitchButton, Setting } from '@element-plus/icons-vue'
import defaultAvatar from '@/assets/defaultAvatar.svg'
import { computed, h, ref } from 'vue'
import { ElInput, ElMessage, ElMessageBox, type TabPaneName } from 'element-plus'
import { useSystem } from '@/stores/useSystem'
import { useElementSize } from '@vueuse/core'
import { useWindowSize } from '@vueuse/core'
import UserMenuTree from '../userMenuTree/UserMenuTree.vue'
import { useUser } from '@/stores/useUser'
import schemaForm from '../schemaForm/SchemaForm.vue'
import type SchemaForm from '../schemaForm/types'
import FormAvatarUpload from '@/components/formAvatarUpload/FormAvatarUpload.vue'
import { useImgDelete } from '@/views/sys/api/user'
import type { SchemaFormInstance } from '../schemaForm/types'
import type { paths } from '@/types/Schema'
import { omit } from 'lodash'
import { socket } from '@/sockets'

const title = ref(import.meta.env.VITE_APP_NAME)

const userAvatar = computed(() => {
  if (useUser().userInfo.avatar) {
    return `${import.meta.env.VITE_UPLOAD_URL}/${useUser().userInfo.avatar}`
  }
  return defaultAvatar
})

const router = useRouter()
const route = useRoute()

const isDark = useDark()
const toggleDark = useToggle(isDark)

let isCollapse = ref(false)

if (['sm', 'md'].includes(useSystem().breakpoints)) {
  isCollapse.value = true
}
useSystem().$subscribe((mutation, state) => {
  isCollapse.value = false
  if (['sm', 'md'].includes(state.breakpoints)) {
    isCollapse.value = true
  }
})

let activeTab = ref(route.path)
let editableTabs = ref([
  {
    name: route.path,
    label: route.meta.title
  }
])

const handleTabsEdit = (targetName: TabPaneName | undefined, action: 'remove' | 'add') => {
  if (action === 'remove') {
    const tabs = editableTabs.value
    let activeName = activeTab.value
    if (activeName === targetName) {
      tabs.forEach((tab, index) => {
        if (tab.name === targetName) {
          const nextTab = tabs[index + 1] || tabs[index - 1]
          if (nextTab) {
            activeName = nextTab.name
          }
        }
      })
    }
    activeTab.value = activeName
    editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
    if (editableTabs.value.length === 0) {
      editableTabs.value = [
        {
          name: '/',
          label: '首页'
        }
      ]
      activeTab.value = '/'
      return router.push('/')
    }
    return router.push(activeName)
  }
}

const headerRef = ref()
const { height: headerHeight } = useElementSize(headerRef)
const { height: windowHeight } = useWindowSize()
const menuHeight = computed(() => {
  return `${windowHeight.value - headerHeight.value}px`
})

const handleSelect = (index: string) => {
  const menu = useUser().userMenus.find((item) => item.path === index)
  if (menu?.menuType == 3) {
    if (menu.openType == 1) {
      window.open(menu.path)
    } else {
      index = `/${encodeURIComponent(index)}`
    }
  }
  const route = router.getRoutes().find((item) => item.path === index)
  if (route) {
    if (!editableTabs.value.find((item) => item.name === index)) {
      editableTabs.value.push({
        name: index,
        label: route?.meta?.title
      })
    }
    router.push(index)
  }
  activeTab.value = index
}

const handleAppSelect = (index: string) => {
  drawer.value = false
  handleSelect(index)
}

const handleTabsChange = (name: TabPaneName) => {
  router.push(name as string)
}

let drawer = ref(false)

let showUserInfo = ref(false)
const userInfoFormModel = ref<
  paths['/admin/sys/permission/userInfo']['post']['requestBody']['content']['application/json'] & {
    username: string
  }
>({
  username: useUser().userInfo.username as string,
  avatar: useUser().userInfo.avatar,
  realname: useUser().userInfo.realname,
  email: useUser().userInfo.email,
  phone: useUser().userInfo.phone
})
const userInfoFormRef = ref<SchemaFormInstance>()
const userInfoForm = ref<SchemaForm<typeof userInfoFormModel.value>>({
  props: {
    labelWidth: '100px',
    labelSuffix: '：'
  },
  formItems: {
    avatar: {
      props: {
        label: '头像'
      },
      component: h(FormAvatarUpload, {
        uploadProps: {
          action: `${import.meta.env.VITE_API_URL}/admin/sys/upload/img`,
          headers: { Authorization: `Bearer ${useUser().token}` },
          name: 'file',
          'on-error': (err) => {
            ElMessage.error(JSON.parse(err.message).message)
          }
        }
      })
    },
    username: {
      props: {
        label: '用户账户'
      },
      component: h(ElInput, { disabled: true })
    },
    realname: {
      props: {
        label: '用户名'
      },
      component: h(ElInput, { placeholder: '请输入用户名' })
    },
    email: {
      props: {
        label: '邮箱',
        rules: [
          {
            validator: (rule, value, cb) => {
              if (!value) {
                cb()
              }
              if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                cb('邮箱格式不正确')
              }
              cb()
            }
          }
        ]
      },
      component: h(ElInput, { type: 'email', placeholder: '请输入邮箱' })
    },
    phone: {
      props: {
        label: '手机号',
        rules: [
          {
            validator: (rule, value, cb) => {
              if (!value) {
                cb()
              }
              if (!/^1[3456789]\d{9}$/.test(value)) {
                cb('手机号格式不正确')
              }
              cb()
            }
          }
        ]
      },
      component: h(ElInput, { type: 'tel', placeholder: '请输入手机号' })
    }
  }
})
const confirmUserInfoLoading = ref(false)
const confirmUserInfo = async () => {
  try {
    confirmUserInfoLoading.value = true
    await userInfoFormRef.value?.formRef?.validate()
    await useUser()
      .updateUserInfo(omit(userInfoFormModel.value, ['username']))
      .execute(true)
    await useUser().getPermissions()
    showUserInfo.value = false
    ElMessage.success('修改成功')
  } catch (error) {
    console.error(error)
  } finally {
    confirmUserInfoLoading.value = false
  }
}

let showUpdatePassword = ref(false)
const updatePasswordFormModel = ref<
  paths['/admin/sys/permission/updatePassword']['post']['requestBody']['content']['application/json']
>({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})
const updatePasswordFormRef = ref<SchemaFormInstance>()
const updatePasswordForm = ref<
  SchemaForm<
    paths['/admin/sys/permission/updatePassword']['post']['requestBody']['content']['application/json']
  >
>({
  props: {
    labelWidth: '100px',
    labelSuffix: '：',
    labelPosition: useSystem().breakpoints == 'xs' ? 'top' : 'left'
  },
  formItems: {
    oldPassword: {
      props: {
        label: '当前密码',
        rules: [{ required: true, message: '请输入当前密码' }]
      },
      component: h(ElInput, { type: 'password', placeholder: '请输入当前密码', showPassword: true })
    },
    newPassword: {
      props: {
        label: '新密码',
        rules: [
          { required: true, message: '请输入新密码' },
          { min: 8, message: '密码长度不能小于8位' },
          { max: 16, message: '密码长度不能大于16位' },
          {
            validator: (rule, value, cb) => {
              if (!/\d/.test(value)) {
                cb('密码必须包含数字')
              }
              if (!/[A-Z]/.test(value)) {
                cb('密码必须包含大写字母')
              }
              if (!/[a-z]/.test(value)) {
                cb('密码必须包含小写字母')
              }
              if (!/[!@#$%^&*()\\/`~\-_=\\[+{};:,<.>_|'"?]/.test(value)) {
                cb('密码必须包含特殊字符')
              }
              cb()
            }
          }
        ]
      },
      component: h(ElInput, {
        type: 'password',
        placeholder: '请输入新密码',
        showPassword: true
      }),
      vIf: undefined
    },
    confirmPassword: {
      props: {
        label: '确认密码',
        rules: [
          { required: true, message: '请确认密码' },
          {
            validator: (rule, value, cb) => {
              if (value !== updatePasswordFormModel.value.newPassword) {
                cb('两次密码不一致')
              }
              cb()
            }
          }
        ]
      },
      component: h(ElInput, {
        type: 'password',
        placeholder: '请确认密码',
        showPassword: true
      })
    }
  }
})
let updatePasswordLoading = ref(false)
const confirmUpdatePassword = async () => {
  try {
    updatePasswordLoading.value = true
    await updatePasswordFormRef.value?.formRef?.validate()
    await useUser().updatePassword(updatePasswordFormModel.value).execute(true)
    showUpdatePassword.value = false
    ElMessage.success('修改成功')
  } catch (error) {
    console.error(error)
  } finally {
    updatePasswordLoading.value = false
  }
}

const logout = async () => {
  try {
    await ElMessageBox.confirm('是否退出系统？', 'Warning', {
      title: '提示',
      type: 'warning'
    })
    await useUser().logout().execute(true)
    if (socket.connected) {
      socket.disconnect()
    }
    useUser().delToken()
    useUser().$reset()
    router.replace('/login')
  } catch (error) {
    console.error(error)
  }
}
</script>
<style scoped></style>
