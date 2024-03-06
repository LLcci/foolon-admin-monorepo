<template>
  <div>
    <div class="flex items-center">
      <div>
        <ElIcon v-if="icon" :size="24"><component :is="icon"></component></ElIcon>
        <span v-else>请选择图标</span>
      </div>
      <div class="ml">
        <ElButton v-if="icon" type="danger" plain @click="handleClear"> 清除 </ElButton>
        <ElButton v-else plain @click="dialogVisible = true"> 选择图标 </ElButton>
      </div>
    </div>
    <ElDialog v-model="dialogVisible" title="选择图标">
      <el-scrollbar height="400px">
        <el-row>
          <el-col :span="24">
            <el-input v-model="searchValue" placeholder="请输入图标名称查询" clearable></el-input>
          </el-col>
        </el-row>
        <el-row class="mt">
          <el-col
            v-for="[key, component] in iconList"
            :key="key"
            :span="2"
            class="@hover:cursor-pointer"
            @click="selectIcon = key"
          >
            <el-card
              shadow="hover"
              :body-style="`${
                selectIcon == key ? 'background-color: var(--el-color-success)' : ''
              }`"
            >
              <div class="flex flex-col items-center">
                <el-icon :size="24">
                  <component :is="component"></component>
                </el-icon>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-scrollbar>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </template>
    </ElDialog>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const icon = defineModel({
  required: false,
  type: String
})

const searchValue = ref('')

const iconList = computed(() => {
  return Object.entries(ElementPlusIconsVue).filter(([key]) => {
    return searchValue.value ? key.toLowerCase().includes(searchValue.value.toLowerCase()) : true
  })
})

const dialogVisible = ref(false)

const selectIcon = ref('')

const handleConfirm = () => {
  dialogVisible.value = false
  icon.value = selectIcon.value
  selectIcon.value = ''
}

const handleClear = () => {
  icon.value = ''
}
</script>
<style scoped></style>
