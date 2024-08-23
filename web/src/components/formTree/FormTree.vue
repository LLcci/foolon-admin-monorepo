<template>
  <el-tree
    ref="tree"
    nodeKey="value"
    v-bind="props"
    :filter-node-method="filterNode"
    @check-change="handleChange"
  />
</template>
<script setup lang="ts">
import { ElTree } from 'element-plus'
import { type TreeKey, type TreeNodeData } from 'element-plus/es/components/tree/src/tree.type.mjs'
import { onMounted, ref } from 'vue'
defineProps<{ props?: InstanceType<typeof ElTree>['$props'] }>()

const modelValue = defineModel<TreeKey[]>({ required: false })

const tree = ref<InstanceType<typeof ElTree>>()

onMounted(() => {
  if (!modelValue.value) return tree.value?.setCheckedKeys([])
  tree.value?.setCheckedKeys(modelValue.value)
})

const handleChange = () => {
  modelValue.value = tree.value?.getCheckedNodes(false, true).map((item) => item.value)
}

const filterNode = (value: string, data: TreeNodeData) => {
  if (!value) return true
  return data.label.includes(value)
}

defineExpose({
  tree
})
</script>
<style scoped></style>
