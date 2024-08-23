<template>
  <div class="w-full flex flex-col">
    <el-input v-model="searchValue" placeholder="请输入关键字查询" @input="handleSearch" />
    <div class="mt">
      <el-button type="primary" @click="selectAll">全选</el-button>
      <el-button @click="reset">重置</el-button>
      <el-button @click="expandAll">全部展开</el-button>
      <el-button @click="retractAll">全部收起</el-button>
    </div>
    <div class="mt">
      <el-switch v-model="checkStrictly" active-text="父子关联" />
    </div>
    <el-scrollbar class="mt" max-height="400px">
      <FormTree
        ref="formTree"
        v-model="modelValue"
        v-bind="props.treeProps"
        showCheckbox
        :checkStrictly="!checkStrictly"
      ></FormTree>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { ElTree } from 'element-plus'
import FormTree from './FormTree.vue'
import { ref } from 'vue'

const props = defineProps<{
  treeProps?: InstanceType<typeof ElTree>['$props']
  allNodes: string[]
}>()

const formTree = ref()

const modelValue = defineModel<string[]>({ required: false })

const searchValue = ref('')
const handleSearch = () => {
  formTree.value.tree.filter(searchValue.value)
}

const selectAll = () => {
  formTree.value.tree.setCheckedKeys(props.allNodes)
}

const reset = () => {
  formTree.value.tree.setCheckedKeys([])
}

const expandAll = () => {
  const nodes = formTree.value.tree.store._getAllNodes()
  nodes.forEach((item: { expanded: boolean }) => {
    item.expanded = true
  })
}

const retractAll = () => {
  const nodes = formTree.value.tree.store._getAllNodes()
  nodes.forEach((item: { expanded: boolean }) => {
    item.expanded = false
  })
}

const checkStrictly = ref(false)
</script>

<style scoped></style>
