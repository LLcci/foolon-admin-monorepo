<template>
  <el-select
    v-model="modelValue"
    v-bind="props.selectProps"
    v-on="{ ...props.selectEvents }"
    :loading="isFetching"
  >
    <el-option v-for="item in data?.data" :key="item.id" :label="item.label" :value="item.value" />
  </el-select>
</template>

<script setup lang="ts">
import { useDictList } from '@/hooks/useDict'
import type { ElSelect } from 'element-plus'

const modelValue = defineModel<string>()

const props = withDefaults(
  defineProps<{
    code: string
    setDefault?: boolean
    selectProps?: InstanceType<typeof ElSelect>['$props']
    selectEvents?: Record<string, (...arg: any[]) => any>
  }>(),
  { setDefault: false }
)

const { data, isFetching, onFetchFinally } = useDictList(props.code)

onFetchFinally(() => {
  if (!props.setDefault) {
    return
  }
  for (const item of data.value?.data ?? []) {
    if (item.default) {
      modelValue.value = item.value
    }
  }
})
</script>

<style scoped></style>
