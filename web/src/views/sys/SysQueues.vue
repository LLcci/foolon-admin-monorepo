<template>
  <schemaTableForm
    v-model:search-form-model="searchFormModel"
    v-model:edit-form-model="editFormModel"
    :api="api"
    :table-form="tableForm"
  >
    <template #tableButtons="scope">
      <el-button
        type="success"
        v-permissions="api.id"
        text
        size="default"
        @click="showInfo(scope.row)"
        >查看</el-button
      >
    </template>
  </schemaTableForm>
  <el-dialog
    v-model="infoDialogShow"
    :fullscreen="['xs', 'sm', 'md'].includes(useSystem().breakpoints)"
    :title="infoData?.name"
  >
    <JsonEditorVue v-model="infoData" currentMode="view" :language="'zh-CN'"></JsonEditorVue>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="infoDialogShow = false">取消</el-button>
        <el-button type="primary" @click="infoDialogShow = false">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import schemaTableForm from '@/components/schemaTableForm/SchemaTableForm.vue'
import type SchemaTableForm from '@/components/schemaTableForm/types'
import type { Api } from '@/components/schemaTableForm/types'
import type { paths } from '@/types/Schema'
import { ElInput, ElOption, ElSelect, dayjs } from 'element-plus'
import { h, ref } from 'vue'
import { useSystem } from '@/stores/useSystem'
// @ts-ignore
import JsonEditorVue from 'json-editor-vue3'
import { useConsumerMethod, useQueuesId } from './api/queues'
import { useUserList } from './api/user'

const api = ref<Api>({
  page: '/admin/sys/queues/page',
  list: '',
  id: '/admin/sys/queues/id',
  create: '/admin/sys/queues/add',
  update: '',
  import: '',
  delete: '/admin/sys/queues/remove'
})

const searchFormModel = ref({})

const editFormModel = ref<
  paths['/admin/sys/queues/add']['post']['requestBody']['content']['application/json']
>({
  name: '',
  method: '',
  data: {}
})

const tableForm = ref<
  SchemaTableForm<
    paths['/admin/sys/queues/id']['get']['responses']['200']['content']['application/json']
  >
>({
  id: {
    table: {
      label: 'id',
      align: 'center'
    }
  },
  name: {
    table: {
      label: '名称',
      align: 'center'
    },
    editForm: {
      rule: [{ required: true, message: '请输入名称' }],
      props: {
        label: '名称'
      },
      component: h(ElInput, { placeholder: '请输入名称' })
    },
    searchForm: {
      props: {
        label: '名称'
      },
      component: h(ElInput, { placeholder: '请输入名称' })
    }
  },
  method: {
    editForm: {
      props: {
        label: '方法'
      },
      rule: [{ required: true, message: '请选择方法' }]
    }
  },
  notifier: {
    editForm: {
      props: {
        label: '通知用户'
      }
    }
  },
  data: {
    table: {
      label: 'data',
      align: 'center',
      formatter(row, column, cellValue, index) {
        return JSON.stringify(cellValue)
      }
    },
    editForm: {
      rule: [{ required: true, message: '请输入数据' }],
      props: {
        label: 'data'
      },
      component: h(JsonEditorVue, { language: 'zh-CN' })
    }
  },
  opts: {
    table: {
      label: 'opts',
      align: 'center',
      formatter(row, column, cellValue, index) {
        return JSON.stringify(cellValue)
      }
    },
    editForm: {
      props: {
        label: 'opts'
      },
      component: h(JsonEditorVue, { language: 'zh-CN' })
    }
  },
  state: {
    searchForm: {
      props: {
        label: '状态'
      },
      component: h(
        ElSelect,
        { placeholder: '请选择状态' },
        {
          default: () => [
            h(ElOption, { value: 'active', label: 'active' }),
            h(ElOption, { value: 'delayed', label: 'delayed' }),
            h(ElOption, { value: 'prioritized', label: 'prioritized' }),
            h(ElOption, { value: 'waiting', label: 'waiting' }),
            h(ElOption, { value: 'waiting-children', label: 'waiting-children' }),
            h(ElOption, { value: 'completed', label: 'completed' }),
            h(ElOption, { value: 'failed', label: 'failed' })
          ]
        }
      )
    }
  },
  timestamp: {
    table: {
      label: 'timestamp',
      align: 'center',
      formatter(row, column, cellValue, index) {
        return dayjs(cellValue).format('YYYY-MM-DD HH:mm:ss')
      }
    }
  },
  failedReason: {
    table: {
      label: 'failedReason',
      align: 'center'
    }
  },
  returnvalue: {
    table: {
      label: 'returnvalue',
      align: 'center',
      formatter(row, column, cellValue, index) {
        try {
          return JSON.stringify(cellValue)
        } catch (error) {
          return cellValue
        }
      }
    }
  },
  finishedOn: {
    table: {
      label: 'finishedOn',
      align: 'center',
      formatter(row, column, cellValue, index) {
        return dayjs(cellValue).format('YYYY-MM-DD HH:mm:ss')
      }
    }
  }
})

let infoDialogShow = ref(false)
const showInfo = async (
  row: paths['/admin/sys/queues/id']['get']['responses']['200']['content']['application/json']
) => {
  try {
    const { data } = await useQueuesId(row.id)
    infoData.value = data.value
    infoDialogShow.value = true
  } catch (error) {
    console.error(error)
  }
}
let infoData = ref<
  paths['/admin/sys/queues/id']['get']['responses']['200']['content']['application/json'] | null
>({})

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

const { data: userList, onFetchResponse: onUserListResonse } = useUserList()
onUserListResonse(() => {
  if (tableForm.value.notifier?.editForm) {
    tableForm.value.notifier.editForm.component = h(
      ElSelect,
      { placeholder: '请选择通知用户' },
      {
        default: () =>
          userList.value?.map((item) => {
            return h(ElOption, { value: item.id as string, label: item.realname })
          })
      }
    )
  }
})
</script>

<style scoped></style>
