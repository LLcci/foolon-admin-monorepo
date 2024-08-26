<template>
  <schemaTableForm
    v-model:search-form-model="searchFormModel"
    v-model:edit-form-model="editFormModel"
    :api="api"
    :table-form="tableForm"
  >
  </schemaTableForm>
</template>

<script setup lang="ts">
import type { Api, SchemaTableForm } from '@/components/schemaTableForm/types'
import type { paths } from '@/types/Schema'
import { ElInput, ElOption, ElPopover, ElSelect } from 'element-plus'
import { h, ref } from 'vue'
// @ts-ignore
import JsonEditorVue from 'json-editor-vue3'
import { useConsumerMethod } from './api/queues'
import CronForm from '@/components/cronInput/CronForm.vue'
import { useDictSchema } from '@/hooks/useDict'

const api = ref<Api>({
  page: '/admin/sys/task/page',
  list: '/admin/sys/task/list',
  id: '/admin/sys/task/id',
  create: '/admin/sys/task/save',
  update: '/admin/sys/task/save',
  import: '/admin/sys/task/import',
  delete: '/admin/sys/task/delete'
})

const searchFormModel = ref({})

const editFormModel = ref<
  paths['/admin/sys/task/save']['post']['requestBody']['content']['application/json']
>({
  name: '',
  cron: '',
  method: '',
  status: '1'
})

const tableForm = ref<
  SchemaTableForm<
    paths['/admin/sys/task/id']['get']['responses']['200']['content']['application/json']
  >
>({
  name: {
    table: {
      label: '任务名称',
      align: 'center'
    },
    searchForm: {
      props: {
        label: '任务名称'
      },
      component: h(ElInput, { placeholder: '请输入任务名称' })
    },
    editForm: {
      rule: [{ required: true, message: '请输入任务名称' }],
      props: {
        label: '任务名称'
      },
      component: h(ElInput, { placeholder: '请输入任务名称' })
    }
  },
  description: {
    table: {
      label: '任务描述',
      align: 'center'
    },
    editForm: {
      props: {
        label: '任务描述'
      },
      component: h(ElInput, { placeholder: '请输入任务描述', type: 'textarea' })
    }
  },
  method: {
    table: {
      label: '任务方法',
      align: 'center'
    },
    editForm: {
      rule: [{ required: true, message: '请选择任务方法' }],
      props: {
        label: '任务方法'
      }
    }
  },
  data: {
    table: {
      label: '传递参数',
      align: 'center',
      formatter(row, column, cellValue, index) {
        return JSON.stringify(cellValue)
      }
    },
    editForm: {
      props: {
        label: '传递参数'
      },
      component: h(JsonEditorVue, { language: 'zh-CN' }),
      importFormatter(value) {
        return JSON.parse(value)
      }
    }
  },
  cron: {
    table: {
      label: 'cron',
      align: 'center'
    },
    editForm: {
      rule: [{ required: true, message: '请设置cron' }],
      props: {
        label: 'cron',
        required: true
      },
      // @ts-ignore
      component: h(CronForm, { inputProps: { placeholder: '请设置cron' } })
    }
  }
})

useDictSchema('status', { setDefault: true }).then((res) => {
  tableForm.value.status = res
})

const { data: methods, onFetchResponse: onMethodResponse } = useConsumerMethod()
onMethodResponse(() => {
  if (tableForm.value.method?.editForm) {
    tableForm.value.method.editForm.component = h(
      ElSelect,
      { placeholder: '请选择方法' },
      {
        default: () =>
          methods.value?.map((item) => {
            return h(ElOption, { value: item, label: item })
          })
      }
    )
  }
})
</script>

<style scoped></style>
