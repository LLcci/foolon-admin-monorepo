<template>
  <schemaForm
    ref="formRef"
    v-model="formModel"
    :form="form"
    @on-validate-ok="handleSubmit"
  ></schemaForm>
</template>
<script setup lang="ts">
import schemaForm from '@/components/schemaForm/SchemaForm.vue'
import type { SchemaFormInstance } from '@/components/schemaForm/types'
import type SchemaForm from '@/components/schemaForm/types'
import { ElInput, ElOption, ElSelect } from 'element-plus'
import { h, ref } from 'vue'

type Form = {
  input: unknown
  select?: unknown
}
const formRef = ref<SchemaFormInstance>()

const formModel = ref<Form>({ input: null, select: null })

const form = ref<SchemaForm<Form>>({
  props: {
    rules: {
      input: [{ required: true, message: '请输入' }]
    },
    labelWidth: '100px'
  },
  formItems: {
    input: {
      props: {
        label: '输入框'
      },
      vIf(model) {
        console.log('🚀 ~ vIf ~ model:', model)
        return model.select != '1'
      },
      component: h(ElInput, {
        placeholder: '请输入',
        onChange(value) {
          console.log('🚀 ~ component:h ~ value:', value)
        }
      })
    },
    select: {
      props: {
        label: '选择框'
      },
      component: h(
        ElSelect,
        {
          placeholder: '请选择',
          onChange(value) {
            console.log('🚀 ~ component:h ~ value:', value)
          }
        },
        {
          default: () => [
            h(ElOption, { value: '1', label: '1' }),
            h(ElOption, { value: '2', label: '2' })
          ]
        }
      )
    }
  }
})
function handleSubmit(res: Form) {
  console.log('🚀 ~ res:', res)
}
</script>
<style scoped></style>
