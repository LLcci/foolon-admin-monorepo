<template>
  <schemaForm
    ref="formRef"
    v-model="formModel"
    :form="form"
    @on-validate-ok="handleSubmit"
  ></schemaForm>
</template>
<script setup lang="ts">
import schemaForm from '@/components/schemaForm/schemaForm.vue'
import type { SchemaFormInstance } from '@/components/schemaForm/types'
import type SchemaForm from '@/components/schemaForm/types'
import { ElOption } from 'element-plus'
import { h, ref } from 'vue'

type Form = {
  input: unknown
  select: unknown
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
      component: 'ElInput',
      componentProps: {
        placeholder: '请输入'
      },
      componentEvents: {
        change(value: any) {
          console.log('🚀 ~ value:', value)
        }
      }
    },
    select: {
      props: {
        label: '选择框'
      },
      component: 'ElSelect',
      componentProps: {
        options: [
          {
            value: '1',
            label: '选项1'
          },
          {
            value: '2',
            label: '选项2'
          }
        ]
      },
      componentEvents: {
        change(value: any) {
          console.log('🚀 ~ value:', value)
        }
      },
      componentSlots: {
        default: [h(ElOption, { value: '1', label: '1' }), h(ElOption, { value: '2', label: '2' })]
      }
    }
  },
  buttons: [
    {
      props: {
        type: 'primary'
      },
      slots: {
        default: [h('span', '提交')]
      },
      events: {
        click() {
          formRef.value?.formRef?.validate().then(() => {
            console.log('🚀 ~ res:', formModel.value)
          })
        }
      }
    }
  ]
})
function handleSubmit(res: Form) {
  console.log('🚀 ~ res:', res)
}
</script>
<style lang="scss" scoped></style>
