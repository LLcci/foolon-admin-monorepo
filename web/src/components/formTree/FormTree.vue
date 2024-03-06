<template>
  <el-tree ref="tree" v-bind="props" @check-change="handleChange" />
</template>
<script setup lang="ts">
import { ElTree } from 'element-plus'
import { type TreeKey } from 'element-plus/es/components/tree/src/tree.type.mjs'
import { ref, watch } from 'vue'
defineProps<{ props?: InstanceType<typeof ElTree> }>()
const modelValue = defineModel<TreeKey[]>({ required: false })

const tree = ref<InstanceType<typeof ElTree>>()

watch(modelValue, () => {
  if (!modelValue.value) return tree.value?.setCheckedKeys([])
  tree.value?.setCheckedKeys(modelValue.value)
})

const handleChange = () => {
  modelValue.value = tree.value?.getCheckedNodes(false, true).map((item) => item.value)
}
</script>
<style scoped></style>
