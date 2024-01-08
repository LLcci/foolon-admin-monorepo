<template>
  <el-container class="min-h-screen safe-area">
    <el-header height="fit-content(height)" class="bg-$el-color-primary color-$el-color-white">
      <el-row align="middle" justify="space-between">
        <el-col :span="useSystem().orientation == 'Landscape' ? 5 : 15">
          <div
            class="flex items-center"
            :class="{
              'h-10': useSystem().orientation == 'Portrait',
              'h-15': useSystem().orientation == 'Landscape'
            }"
          >
            <img
              :class="{
                'w-8': useSystem().orientation == 'Landscape',
                'w-6': useSystem().orientation == 'Portrait'
              }"
              src="/favicon.svg"
              alt=""
            />
            <span
              class="ml-2 font-bold"
              :class="{
                'font-size-lg': useSystem().orientation == 'Landscape',
                'font-size-sm': useSystem().orientation == 'Portrait'
              }"
              >火龙果的操作台</span
            >
            <el-button
              v-if="useSystem().orientation == 'Landscape'"
              type="primary"
              size="small"
              @click="() => (isCollapse = !isCollapse)"
            >
              <el-icon v-if="!isCollapse" :size="20"><Fold /></el-icon>
              <el-icon v-else :size="20"><Expand /></el-icon>
            </el-button>
            <el-button type="primary" size="small" @click="toggleDark()">
              <el-icon v-if="isDark" :size="20"> <Sunny /></el-icon>
              <el-icon v-else :size="20"> <Moon /></el-icon>
            </el-button>
          </div>
        </el-col>
        <el-col :span="useSystem().orientation == 'Landscape' ? 5 : 9">
          <div
            class="flex items-center"
            :class="{
              'h-10': useSystem().orientation == 'Portrait',
              'h-15': useSystem().orientation == 'Landscape'
            }"
          >
            <el-avatar
              :size="useSystem().orientation == 'Landscape' ? 30 : 24"
              fit="contain"
              :src="defaultAvatar"
            />
            <div
              v-if="useSystem().orientation == 'Landscape'"
              class="max-w-30 ml-2 font-size-base font-bold truncate"
            >
              火龙果果火龙果果
            </div>
            <el-dropdown class="ml-2" trigger="click">
              <el-button
                v-if="useSystem().orientation == 'Landscape'"
                type="primary"
                size="large"
                :icon="Setting"
                >设置</el-button
              >
              <el-button v-else type="primary" size="small"
                ><el-icon :size="20"><Setting /></el-icon
              ></el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>用户信息</el-dropdown-item>
                  <el-dropdown-item>修改密码</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <el-button
              v-if="useSystem().orientation == 'Landscape'"
              type="primary"
              size="large"
              :icon="SwitchButton"
              >退出登录</el-button
            >
            <el-button v-else type="primary" size="small"
              ><el-icon :size="20"><SwitchButton /></el-icon
            ></el-button>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside
        class="border-r-1px border-r-solid border-r-$el-border-color shadow-lg"
        width="fit-content(width)"
        v-if="useSystem().orientation == 'Landscape'"
      >
        <el-menu :default-active="route.path" :collapse="isCollapse" router @select="handleSelect">
          <el-menu-item index="/">
            <el-icon><House /></el-icon>
            <template #title>
              <span>首页</span>
            </template>
          </el-menu-item>
          <el-sub-menu index="/sys">
            <template #title>
              <el-icon><Setting /></el-icon>
              <span>系统设置</span>
            </template>
            <el-menu-item index="/sys/menu">
              <el-icon><Operation /></el-icon>
              <template #title>
                <span>菜单管理</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/sys/role">
              <el-icon><Lock /></el-icon>
              <template #title>
                <span>角色管理</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/sys/user">
              <el-icon><User /></el-icon>
              <template #title>
                <span>用户管理</span>
              </template>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header height="fit-content(height)">
          <el-tabs
            v-if="useSystem().orientation == 'Landscape'"
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
          <div
            v-else
            class="border-b-1px border-b-solid border-b-$el-border-color flex items-center h-10"
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
            <el-card class="flex-1">
              <RouterView />
            </el-card>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
  <el-drawer v-model="drawer" title="菜单" direction="ltr" size="100%">
    <el-menu :default-active="route.path" router>
      <el-menu-item index="/">
        <el-icon><House /></el-icon>
        <template #title>
          <span>首页</span>
        </template>
      </el-menu-item>
      <el-sub-menu index="/sys">
        <template #title>
          <el-icon><Setting /></el-icon>
          <span>系统设置</span>
        </template>
        <el-menu-item index="/sys/menu">
          <el-icon><Operation /></el-icon>
          <template #title>
            <span>菜单管理</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/sys/role">
          <el-icon><Lock /></el-icon>
          <template #title>
            <span>角色管理</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/sys/user">
          <el-icon><User /></el-icon>
          <template #title>
            <span>用户管理</span>
          </template>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-drawer>
</template>
<script setup lang="ts">
import { RouterView, useRoute, useRouter } from 'vue-router'
import { useDark, useToggle } from '@vueuse/core'
import { SwitchButton, Setting } from '@element-plus/icons-vue'
import defaultAvatar from '@/assets/defaultAvatar.svg'
import { ref } from 'vue'
import type { TabPaneName } from 'element-plus'
import { useSystem } from '@/stores/useSystem'

const router = useRouter()
const route = useRoute()

const isDark = useDark()
const toggleDark = useToggle(isDark)

let isCollapse = ref(false)

let activeTab = ref(route.path)
let editableTabs = ref([
  {
    name: '/',
    label: '首页'
  },
  {
    name: '/sys/menu',
    label: '菜单管理'
  },
  {
    name: '/sys/role',
    label: '角色管理'
  },
  {
    name: '/sys/user',
    label: '用户管理'
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
      router.push('/')
    }
  }
}

const handleSelect = (index: string) => {
  console.log('🚀 ~ file: mainLayout.vue:274 ~ index:', index)
}

const handleTabsChange = (name: TabPaneName) => {
  console.log('🚀 ~ file: mainLayout.vue:152 ~ handleTabsChange ~ name:', name)
}

let drawer = ref(false)
</script>
<style lang="scss" scoped></style>
