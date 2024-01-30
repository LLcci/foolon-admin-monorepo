<template>
  <schemaTableForm :table-form="tableForm" :api="api"></schemaTableForm>
</template>
<script setup lang="ts">
import schemaTableForm from '@/components/schemaTableForm/schemaTableForm.vue'
import type { Api } from '@/components/schemaTableForm/types'
import type SchemaTableForm from '@/components/schemaTableForm/types'
import type { paths } from '@/types/Schema'
import { ElInput, ElInputNumber, ElOption, ElSelect } from 'element-plus'
import { h, ref } from 'vue'

const api = ref<Api>({
  page: '/sys/menu/page',
  id: '/sys/menu/id',
  save: '/sys/menu/save',
  delete: '/sys/menu/delete',
  list: '/sys/menu/list'
})

const tableForm = ref<
  SchemaTableForm<
    paths['/admin/sys/menu/id']['get']['responses']['200']['content']['application/json']
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
      label: '组件名称',
      align: 'center'
    },
    form: {
      searchFormShow: true,
      editFormShow: true,
      formRule: [{ required: true, message: '请输入组件名称' }],
      itemProps: {
        label: '组件名称'
      },
      itemComponent: h(ElInput, { placeholder: '请输入组件名称' })
    }
  },
  sort: {
    table: {
      show: true,
      label: '排序',
      align: 'center'
    },
    form: {
      searchFormShow: false,
      editFormShow: true,
      formRule: [{ required: true, message: '请输入排序' }],
      itemProps: {
        label: '排序'
      },
      itemComponent: h(ElInputNumber, { placeholder: '排序' })
    }
  },
  icon: {
    table: {
      show: false
    },
    form: {
      searchFormShow: false,
      editFormShow: true,
      itemProps: {
        label: '图标'
      },
      itemComponent: h(ElInput, { placeholder: '请输入图标' })
    }
  },
  status: {
    table: {
      show: true,
      label: '状态',
      align: 'center',
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
  parentId: {
    table: {
      show: false
    },
    form: {
      searchFormShow: false,
      editFormShow: false
    }
  },
  path: {
    table: {
      show: true,
      label: '路径',
      align: 'center'
    },
    form: {
      searchFormShow: false,
      editFormShow: true,
      formRule: [{ required: true, message: '请输入路径' }],
      itemProps: {
        label: '路径'
      },
      itemComponent: h(ElInput, { placeholder: '请输入路径' })
    }
  },
  component: {
    table: {
      show: true,
      label: '组件',
      align: 'center'
    },
    form: {
      searchFormShow: false,
      editFormShow: true,
      formRule: [{ required: true, message: '请输入组件' }],
      itemProps: {
        label: '组件'
      },
      itemComponent: h(ElInput, { placeholder: '请输入组件' })
    }
  },
  menuType: {
    table: {
      show: true,
      label: '类型',
      align: 'center',
      formatter(row, column, cellValue) {
        return cellValue === 0 ? '一级菜单' : cellValue === 1 ? '二级菜单' : '权限'
      },
      exportFormatter(value) {
        return value === 0 ? '一级菜单' : value === 1 ? '二级菜单' : '权限'
      }
    },
    form: {
      searchFormShow: false,
      editFormShow: true,
      formRule: [{ required: true, message: '请选择类型' }],
      itemProps: {
        label: '类型'
      },
      itemComponent: h(
        ElSelect,
        { placeholder: '请选择类型' },
        {
          default: () => [
            h(ElOption, { label: '一级菜单', value: 0 }),
            h(ElOption, { label: '二级菜单', value: 1 }),
            h(ElOption, { label: '权限', value: 2 })
          ]
        }
      ),
      importFormatter(value) {
        return value == '一级菜单' ? 0 : value == '二级菜单' ? 1 : 2
      }
    }
  },
  perms: {
    table: {
      show: false
    },
    form: {
      searchFormShow: false,
      editFormShow: true,
      formRule: [{ required: false, message: '请输入权限' }],
      itemProps: {
        label: '权限'
      },
      itemComponent: h(ElInput, { placeholder: '请输入权限' })
    }
  },
  keepalive: {
    table: {
      show: true,
      label: '缓存',
      align: 'center',
      formatter(row, column, cellValue) {
        return cellValue === 1 ? '是' : '否'
      },
      exportFormatter(value) {
        return value === 1 ? '是' : '否'
      }
    },
    form: {
      searchFormShow: false,
      editFormShow: true,
      formRule: [{ required: true, message: '请选择缓存' }],
      itemProps: {
        label: '缓存'
      },
      itemComponent: h(
        ElSelect,
        { placeholder: '请选择缓存' },
        {
          default: () => [
            h(ElOption, { label: '是', value: 1 }),
            h(ElOption, { label: '否', value: 0 })
          ]
        }
      ),
      importFormatter(value) {
        return value === '是' ? 1 : 0
      }
    }
  }
})
</script>
<style lang="scss" scoped></style>
