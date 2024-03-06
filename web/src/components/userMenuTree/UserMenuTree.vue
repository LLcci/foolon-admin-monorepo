<template>
  <template v-for="(item, index) in props.userMenuTree" :key="index">
    <el-menu-item v-if="!item.children?.length" :index="item.index">
      <el-icon><component v-if="item.icon" :is="item.icon"></component></el-icon>
      <template #title>
        <span class="w-30 overflow-hidden text-nowrap text-ellipsis">{{ item.name }}</span>
      </template>
    </el-menu-item>
    <el-sub-menu v-else :index="item.index">
      <template #title>
        <el-icon><component v-if="item.icon" :is="item.icon"></component></el-icon>
        <span class="w-30 overflow-hidden text-nowrap text-ellipsis">{{ item.name }}</span>
      </template>
      <template v-if="item.children?.length">
        <UserMenuTree :userMenuTree="item.children"></UserMenuTree>
      </template>
    </el-sub-menu>
  </template>
</template>
<script setup lang="ts">
import type { UserMenuTreeType } from '@/types/UserMenuTree.d'
import UserMenuTree from './UserMenuTree.vue'

const props = defineProps<{ userMenuTree: UserMenuTreeType[] }>()
</script>
<style scoped></style>
