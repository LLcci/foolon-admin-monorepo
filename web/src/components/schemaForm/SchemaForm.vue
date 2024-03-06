<template>
  <el-form ref="formRef" v-bind="props.form.props" :model="formModel">
    <template v-for="(item, index) in props.form.formItems" :key="index">
      <el-form-item
        v-if="item?.vIf ? item.vIf(formModel) : true"
        v-bind="item?.props"
        :prop="index"
      >
        <component :is="item?.component" v-model="formModel[index as string]"> </component>
      </el-form-item>
    </template>
    <el-form-item v-if="props.form.props.showButtonSlot">
      <slot>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </slot>
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
import type SchemaForm from './types/'
import { defineModel, ref } from 'vue'
import { type FormInstance } from 'element-plus'
import type { FormModel } from '@/types/index'

const formModel = defineModel<FormModel>({
  required: true
})
const props = defineProps<{ form: SchemaForm<any> }>()

const emits = defineEmits(['onValidateOk'])

const formRef = ref<FormInstance>()

async function handleSubmit() {
  try {
    await formRef.value?.validate()
    emits('onValidateOk', formModel)
  } catch (error) {
    console.warn(error)
  }
}
function resetForm() {
  formRef.value?.resetFields()
}

defineExpose({
  formRef
})
</script>
<style scoped></style>
