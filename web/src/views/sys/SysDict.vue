<template>
  <schemaTableForm
    :table-props="tableProps"
    v-model:search-form-model="searchFormModel"
    v-model:edit-form-model="editFormModel"
    :api="api"
    :table-form="tableForm"
    ref="tableFormRef"
  >
    <template #tableButtons="scope">
      <el-button
        type="success"
        v-permissions="api.id"
        text
        size="default"
        @click="tableFormRef?.handleDialog('查看', scope.row)"
        >查看</el-button
      >
      <el-button
        type="primary"
        v-permissions="api.update"
        text
        size="default"
        @click="tableFormRef?.handleDialog('编辑', scope.row)"
        >编辑</el-button
      >
      <el-button
        type="primary"
        text
        :icon="Setting"
        size="default"
        @click="handleSetting(scope.row)"
        >配置</el-button
      >
      <el-popconfirm title="确定删除？" @confirm="tableFormRef?.handleDelete(scope.row)">
        <template #reference>
          <el-button v-permissions="api.delete" type="danger" text size="default">删除</el-button>
        </template>
      </el-popconfirm>
    </template>
  </schemaTableForm>
  <el-drawer v-model="showSetting" :title="settingType.name" size="50%">
    <schemaTableForm
      v-model:search-form-model="settingSearchFormModel"
      v-model:edit-form-model="settingEditFormModel"
      v-model:import-data-model="settingImportModel"
      :api="settingApi"
      :table-form="settingTableForm"
    >
    </schemaTableForm>
  </el-drawer>
</template>

<script setup lang="ts">
import schemaTableForm from '@/components/schemaTableForm/SchemaTableForm.vue'
import type {
  Api,
  SchemaTableForm,
  SchemaTableFormInstance
} from '@/components/schemaTableForm/types'
import type { paths } from '@/types/Schema'
import { Setting } from '@element-plus/icons-vue'
import {
  ElInput,
  ElInputNumber,
  ElOption,
  ElSelect,
  ElSwitch,
  type TableColumnInstance,
  type TableInstance
} from 'element-plus'

import { h, ref } from 'vue'

const tableFormRef = ref<SchemaTableFormInstance>()

const tableProps = ref<{
  props?: Partial<Omit<TableInstance['$props'], 'data'>>
  actionProps?: Omit<TableColumnInstance['$props'], 'prop'>
}>({
  actionProps: {
    width: '400px'
  }
})

const api = ref<Api>({
  list: '/admin/sys/dictType/list',
  page: '/admin/sys/dictType/page',
  id: '/admin/sys/dictType/id',
  create: '/admin/sys/dictType/save',
  update: '/admin/sys/dictType/save',
  import: '/admin/sys/dictType/import',
  delete: '/admin/sys/dictType/delete'
})

const searchFormModel = ref<
  paths['/admin/sys/dictType/page']['post']['requestBody']['content']['application/json']
>({})

const editFormModel = ref<
  paths['/admin/sys/dictType/save']['post']['requestBody']['content']['application/json']
>({
  name: '',
  code: ''
})

const tableForm = ref<
  SchemaTableForm<
    paths['/admin/sys/dictType/save']['post']['requestBody']['content']['application/json']
  >
>({
  name: {
    table: {
      label: '名称',
      align: 'center'
    },
    searchForm: {
      props: {
        label: '名称'
      },
      component: h(ElInput, { placeholder: '请输入名称' })
    },
    editForm: {
      rule: [{ required: true, message: '请输入名称' }],
      props: {
        label: '名称'
      },
      component: h(ElInput, { placeholder: '请输入名称' })
    }
  },
  code: {
    table: {
      label: '编码',
      align: 'center'
    },
    searchForm: {
      props: {
        label: '编码'
      },
      component: h(ElInput, { placeholder: '请输入编码' })
    },
    editForm: {
      rule: [{ required: true, message: '请输入编码' }],
      props: {
        label: '编码'
      },
      component: h(ElInput, { placeholder: '请输入编码' })
    }
  },
  description: {
    table: {
      label: '描述',
      align: 'center'
    },
    editForm: {
      props: {
        label: '描述'
      },
      component: h(ElInput, { placeholder: '请输入描述', type: 'textarea' })
    }
  },
  status: {
    table: {
      label: '状态',
      formatter(row, column, cellValue) {
        return cellValue === 1 ? '启用' : '停用'
      },
      exportFormatter(value) {
        return value === 1 ? '启用' : '停用'
      }
    },
    editForm: {
      rule: [{ required: true, message: '请选择状态' }],
      props: {
        label: '状态'
      },
      component: h(
        ElSelect,
        { placeholder: '请选择状态' },
        {
          default: () => [
            h(ElOption, { value: 1, label: '启用' }),
            h(ElOption, { value: 0, label: '停用' })
          ]
        }
      ),
      importFormatter(value) {
        return value === '启用' ? 1 : 0
      }
    },
    searchForm: {
      props: {
        label: '状态'
      },
      component: h(
        ElSelect,
        { placeholder: '请选择状态' },
        {
          default: () => [
            h(ElOption, { value: 1, label: '启用' }),
            h(ElOption, { value: 0, label: '停用' })
          ]
        }
      )
    }
  }
})

const showSetting = ref(false)

const settingType = ref<
  paths['/admin/sys/dictType/id']['get']['responses']['200']['content']['application/json']
>({
  name: '',
  code: ''
})

const handleSetting = (
  row: paths['/admin/sys/dictType/id']['get']['responses']['200']['content']['application/json']
) => {
  settingSearchFormModel.value.typeId = row.id as string
  settingEditFormModel.value.typeId = row.id as string
  settingImportModel.value.typeId = row.id as string
  settingType.value = row
  showSetting.value = true
}

const settingApi = ref<Api>({
  list: '/admin/sys/dictData/list',
  page: '/admin/sys/dictData/page',
  id: '/admin/sys/dictData/id',
  create: '/admin/sys/dictData/save',
  update: '/admin/sys/dictData/save',
  import: '/admin/sys/dictData/import',
  delete: '/admin/sys/dictData/delete'
})

const settingSearchFormModel = ref<
  paths['/admin/sys/dictData/page']['post']['requestBody']['content']['application/json']
>({
  typeId: ''
})

const settingEditFormModel = ref<
  paths['/admin/sys/dictData/save']['post']['requestBody']['content']['application/json']
>({
  typeId: '',
  label: '',
  value: '',
  description: '',
  sort: 0,
  default: false
})

const settingImportModel = ref<
  paths['/admin/sys/dictData/import']['post']['requestBody']['content']['application/json']
>({
  typeId: '',
  list: []
})

const settingTableForm = ref<
  SchemaTableForm<
    paths['/admin/sys/dictData/save']['post']['requestBody']['content']['application/json']
  >
>({
  label: {
    table: {
      label: '标签',
      align: 'center'
    },
    editForm: {
      rule: [{ required: true, message: '请输入标签' }],
      props: {
        label: '标签'
      },
      component: h(ElInput, { placeholder: '请输入标签' })
    },
    searchForm: {
      props: {
        label: '标签'
      },
      component: h(ElInput, { placeholder: '请输入标签' })
    }
  },
  value: {
    table: {
      label: '值',
      align: 'center'
    },
    searchForm: {
      props: {
        label: '值'
      },
      component: h(ElInput, { placeholder: '请输入值' })
    },
    editForm: {
      rule: [{ required: true, message: '请输入值' }],
      props: {
        label: '值'
      },
      component: h(ElInput, { placeholder: '请输入值' })
    }
  },
  description: {
    table: {
      label: '描述',
      align: 'center'
    },
    editForm: {
      props: {
        label: '描述'
      },
      component: h(ElInput, { placeholder: '请输入描述', type: 'textarea' })
    }
  },
  sort: {
    table: {
      label: '排序',
      align: 'center'
    },
    editForm: {
      rule: [{ required: true, message: '请输入排序' }],
      props: {
        label: '排序'
      },
      component: h(ElInputNumber)
    }
  },
  default: {
    table: {
      label: '默认',
      align: 'center',
      formatter(row, column, cellValue, index) {
        return cellValue ? '是' : '否'
      }
    },
    editForm: {
      props: {
        label: '默认'
      },
      component: h(ElSwitch),
      importFormatter(value) {
        return value === '是' ? true : false
      }
    }
  },
  status: {
    table: {
      label: '状态',
      formatter(row, column, cellValue) {
        return cellValue === 1 ? '启用' : '停用'
      },
      exportFormatter(value) {
        return value === 1 ? '启用' : '停用'
      }
    },
    editForm: {
      rule: [{ required: true, message: '请选择状态' }],
      props: {
        label: '状态'
      },
      component: h(
        ElSelect,
        { placeholder: '请选择状态' },
        {
          default: () => [
            h(ElOption, { value: 1, label: '启用' }),
            h(ElOption, { value: 0, label: '停用' })
          ]
        }
      ),
      importFormatter(value) {
        return value === '启用' ? 1 : 0
      }
    },
    searchForm: {
      props: {
        label: '状态'
      },
      component: h(
        ElSelect,
        { placeholder: '请选择状态' },
        {
          default: () => [
            h(ElOption, { value: 1, label: '启用' }),
            h(ElOption, { value: 0, label: '停用' })
          ]
        }
      )
    }
  }
})
</script>

<style scoped></style>
