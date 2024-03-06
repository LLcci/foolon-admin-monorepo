<template>
  <schemaTableForm
    v-model:search-form-model="searchFormModel"
    v-model:edit-form-model="editFormModel"
    :table-props="tableProps"
    :table-form="tableForm"
    :api="api"
  ></schemaTableForm>
</template>
<script setup lang="ts">
import schemaTableForm from '@/components/schemaTableForm/SchemaTableForm.vue'
import type { Api } from '@/components/schemaTableForm/types'
import type SchemaTableForm from '@/components/schemaTableForm/types'
import type { paths } from '@/types/Schema'
import { ElInput, ElOption, ElSelect, type TableInstance } from 'element-plus'
import { h, ref } from 'vue'
import { useMenuList } from './api'
import { useMenuTree } from './hooks/useMenuTree'
import FormTree from '@/components/formTree/FormTree.vue'

const api = ref<Api>({
  page: '/admin/sys/role/page',
  list: '/admin/sys/role/list',
  id: '/admin/sys/role/id',
  save: '/admin/sys/role/save',
  import: '/admin/sys/role/import',
  delete: '/admin/sys/role/delete'
})

const searchFormModel = ref<
  paths['/admin/sys/role/page']['post']['requestBody']['content']['application/json']
>({})

const editFormModel = ref<
  paths['/admin/sys/role/save']['post']['requestBody']['content']['application/json']
>({
  status: 1
})

const tableProps = ref<TableInstance['$props']>({
  showOverflowTooltip: true
})

const tableForm = ref<
  SchemaTableForm<
    paths['/admin/sys/role/id']['get']['responses']['200']['content']['application/json']
  >
>({
  id: {
    table: {
      show: false
    },
    form: {
      searchFormShow: false,
      editFormShow: false
    }
  },
  name: {
    table: {
      show: true,
      label: '名称',
      align: 'center'
    },
    form: {
      searchFormShow: true,
      editFormShow: true,
      formRule: [{ required: true, message: '请输入名称' }],
      itemProps: {
        label: '名称'
      },
      itemComponent: h(ElInput, { placeholder: '请输入名称' })
    }
  },
  description: {
    table: {
      show: true,
      label: '描述',
      align: 'center'
    },
    form: {
      searchFormShow: false,
      editFormShow: true,
      itemProps: {
        label: '描述'
      },
      itemComponent: h(ElInput, { placeholder: '请输入描述', type: 'textarea' })
    }
  },
  menuIds: {
    table: {
      show: false
    },
    form: {
      searchFormShow: false,
      editFormShow: true,
      itemProps: {
        label: '权限'
      }
    }
  },
  status: {
    table: {
      show: true,
      label: '状态',
      formatter(row, column, cellValue) {
        return cellValue === 1 ? '启用' : '停用'
      },
      exportFormatter(value) {
        return value === 1 ? '启用' : '停用'
      }
    },
    form: {
      searchFormShow: true,
      editFormShow: true,
      formRule: [{ required: true, message: '请选择状态' }],
      itemProps: {
        label: '状态'
      },
      itemComponent: h(
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
    }
  },
  createTime: {
    table: {
      show: false
    },
    form: {
      searchFormShow: false,
      editFormShow: false
    }
  },
  updateTime: {
    table: {
      show: false
    },
    form: {
      searchFormShow: false,
      editFormShow: false
    }
  },
  createUserId: {
    table: {
      show: false
    },
    form: {
      searchFormShow: false,
      editFormShow: false
    }
  },
  updateUserId: {
    table: {
      show: false
    },
    form: {
      searchFormShow: false,
      editFormShow: false
    }
  }
})

const { data: menuList, onFetchResponse: onMenuListResponse } = useMenuList()
onMenuListResponse(() => {
  const options = useMenuTree(menuList.value)
  tableForm.value.menuIds.form.itemComponent = h(FormTree, {
    data: options,
    defaultExpandAll: true,
    nodeKey: 'value',
    showCheckbox: true,
    checkStrictly: true
  })
})
</script>
<style scoped></style>
