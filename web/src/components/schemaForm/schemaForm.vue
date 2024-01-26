<template>
  <el-form ref="formRef" v-bind="props.form.props" :model="formModel">
    <el-form-item
      v-for="(item, index) in props.form.formItems"
      :key="index"
      v-bind="item.props"
      :prop="index"
    >
      <component
        :is="item.component"
        v-bind="item.componentProps"
        v-on="{ ...item.componentEvents }"
        v-model="formModel[index]"
      >
        <template
          v-for="(slotItem, slotItemIndex) in item.componentSlots"
          :key="slotItemIndex"
          #[slotItemIndex]
        >
          <component
            v-for="(slotItemComponent, slotItemComponentIndex) in slotItem"
            :key="slotItemComponentIndex"
            :is="slotItemComponent"
          ></component>
        </template>
      </component>
    </el-form-item>
    <el-form-item v-if="props.form.buttons">
      <el-button
        v-for="(item, index) in props.form.buttons"
        :class="{
          'ml-3': index > 0
        }"
        v-bind="item.props"
        v-on="{ ...item.events }"
        :key="index"
      >
        <template
          v-for="(slotItem, slotItemIndex) in item.slots"
          :key="slotItemIndex"
          #[slotItemIndex]
        >
          <component
            v-for="(slotItemComponent, slotItemComponentIndex) in slotItem"
            :key="slotItemComponentIndex"
            :is="slotItemComponent"
          ></component>
        </template>
      </el-button>
    </el-form-item>
    <el-form-item v-else>
      <el-button type="primary" @click="handleSubmit">提交</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
import type SchemaForm from './types/'
import { type PropType, defineModel, defineProps, ref, defineEmits, defineExpose } from 'vue'
import { type FormInstance } from 'element-plus'
import type { FormModel } from '@/types/index'

const formModel = defineModel<FormModel>({
  required: true
})
const props = defineProps({
  form: { type: Object as PropType<SchemaForm<FormModel>>, required: true }
})

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
<style lang="scss" scoped></style>
