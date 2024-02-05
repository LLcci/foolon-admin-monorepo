<template>
  <schemaTableForm
    v-model:search-form-model="searchFormModel"
    v-model:edit-form-model="editFormModel"
    @on-table-save-success="menuListFetch"
    :table-props="tableProps"
    :table-form="tableForm"
    :api="api"
  ></schemaTableForm>
</template>
<script setup lang="ts">
import schemaTableForm from '@/components/schemaTableForm/schemaTableForm.vue'
import type { Api } from '@/components/schemaTableForm/types'
import type SchemaTableForm from '@/components/schemaTableForm/types'
import IconSelect from '@/components/iconSelect/iconSelect.vue'
import type { paths } from '@/types/Schema'
import {
  ElIcon,
  ElInput,
  ElInputNumber,
  ElOption,
  ElRadio,
  ElRadioGroup,
  ElSelect,
  ElTreeSelect,
  type TableInstance
} from 'element-plus'
import { h, ref, resolveComponent } from 'vue'
import { useInterfaceRoutes, useMenuList } from './api'
import { useComponents } from '@/hooks/useVite'
const { components } = useComponents()

const api = ref<Api>({
  page: '/sys/menu/page',
  id: '/sys/menu/id',
  save: '/sys/menu/save',
  delete: '/sys/menu/delete',
  list: '/sys/menu/list'
})

const searchFormModel = ref<
  paths['/admin/sys/menu/page']['post']['requestBody']['content']['application/json']
>({})

const editFormModel = ref<
  paths['/admin/sys/menu/save']['post']['requestBody']['content']['application/json']['list'][0]
>({
  menuType: 0,
  keepalive: 1,
  status: 1,
  sort: 0
})

const tableProps = ref<TableInstance['$props']>({
  showOverflowTooltip: true
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
  menuType: {
    table: {
      show: false
    },
    form: {
      searchFormShow: false,
      editFormShow: true,
      formRule: [{ required: true, message: '请选择类型' }],
      itemProps: {
        label: '类型'
      },
      itemComponent: h(
        ElRadioGroup,
        {
          placeholder: '请选择类型',
          onChange(value) {
            editFormModel.value = {
              menuType: value as number,
              keepalive: 1,
              status: 1,
              sort: 0
            }
          }
        },
        {
          default: () => [
            h(ElRadio, { label: 0 }, { default: () => '一级菜单' }),
            h(ElRadio, { label: 1 }, { default: () => '子菜单' }),
            h(ElRadio, { label: 2 }, { default: () => '权限' })
          ]
        }
      ),
      importFormatter(value) {
        return value == '一级菜单' ? 0 : value == '子菜单' ? 1 : 2
      }
    }
  },
  name: {
    table: {
      show: true,
      label: '名称'
    },
    form: {
      searchFormShow: true,
      editFormShow: true,
      formRule: [{ required: true, message: '请输入组件名称' }],
      itemProps: {
        label: '名称'
      },
      itemComponent: h(ElInput, { placeholder: '请输入组件名称' }),
      editFormVIf(value) {
        if (value.menuType == 2) {
          return false
        }
        return true
      }
    }
  },
  icon: {
    table: {
      show: true,
      label: '图标',
      align: 'center',
      formatter(row, column, cellValue) {
        if (cellValue) {
          return h(ElIcon, { size: 24 }, { default: () => h(resolveComponent(cellValue)) })
        }
        return ''
      }
    },
    form: {
      searchFormShow: false,
      editFormShow: true,
      itemProps: {
        label: '图标'
      },
      itemComponent: h(IconSelect),
      editFormVIf(value) {
        if (value.menuType == 2) {
          return false
        }
        return true
      }
    }
  },
  parentId: {
    table: {
      show: false
    },
    form: {
      searchFormShow: false,
      editFormShow: true,
      formRule: [{ required: true, message: '请选择父级菜单' }],
      itemProps: {
        label: '父级菜单'
      },
      editFormVIf(formModel) {
        if (formModel.menuType != 0) {
          return true
        }
        return false
      },
      importFormatter(value) {
        if (value) {
          return menuList.value?.find((item) => item.name == value)?.id
        }
        return value
      }
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
      formRule: [{ message: '请输入组件' }],
      itemProps: {
        label: '组件'
      },
      itemComponent: h(
        ElSelect,
        {
          placeholder: '请选择组件',
          clearable: true,
          filterable: true,
          onChange(value: string) {
            editFormModel.value.path = ''
            if (value) {
              editFormModel.value.path = value.replace(/.vue/, '')
            }
          }
        },
        {
          default: () =>
            components.map((item) => {
              return h(ElOption, { value: item, label: item })
            })
        }
      ),
      editFormVIf(value) {
        if (value.menuType == 2) {
          return false
        }
        return true
      }
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
      itemProps: {
        label: '路径'
      },
      itemComponent: h(ElInput, {
        placeholder: '请输入路径',
        onInput(value) {
          if (value && !value.startsWith('/')) {
            editFormModel.value.path = '/' + value
          }
        }
      }),
      editFormVIf(value) {
        if (value.menuType == 2) {
          return false
        }
        return true
      }
    }
  },
  perms: {
    table: {
      show: true,
      label: '权限',
      align: 'center',
      exportFormatter(value) {
        if (value) {
          return value.join(',')
        }
        return value
      }
    },
    form: {
      searchFormShow: false,
      editFormShow: true,
      formRule: [{ required: true, message: '请选择权限' }],
      itemProps: {
        label: '权限'
      },
      editFormVIf(value) {
        if (value.menuType != 2) {
          return false
        }
        return true
      }
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
  }
})

const {
  data: menuList,
  execute: menuListFetch,
  onFetchResponse: onMenuListResponse
} = useMenuList()
onMenuListResponse(() => {
  const options: any[] = []
  getMenuTree(
    options,
    menuList.value?.filter(
      (item) => item.menuType != 2
    ) as paths['/admin/sys/menu/list']['post']['responses']['200']['content']['application/json']
  )
  tableForm.value.parentId.form.itemComponent = h(ElTreeSelect, {
    placeholder: '请选择父级菜单',
    data: options,
    checkStrictly: true
  })
})
const getMenuTree = (
  menuTree: Record<string, any>[],
  list:
    | paths['/admin/sys/menu/list']['post']['responses']['200']['content']['application/json']
    | null,
  temp?: Record<string, any>
) => {
  list?.forEach((item) => {
    const tree: Record<string, any> = {
      label: item.name,
      value: item.id,
      children: []
    }
    const temPid = item.parentId
    if (!temp && !item.parentId) {
      menuTree.push(tree)
      if (list.filter((i) => i.parentId === item.id).length) {
        getMenuTree(menuTree, list, tree)
      }
    } else if (temp && item.parentId && temPid == temp.value) {
      temp.children.push(tree)
      if (list.filter((i) => i.parentId === item.id).length) {
        getMenuTree(menuTree, list, tree)
      }
    }
  })
}

const { data: interfaceRoutes, onFetchResponse: onInterfaceRoutesResponse } = useInterfaceRoutes()
onInterfaceRoutesResponse(() => {
  tableForm.value.perms.form.itemComponent = h(
    ElSelect,
    {
      placeholder: '请选择权限',
      clearable: true,
      filterable: true,
      multiple: true
    },
    {
      default: () =>
        interfaceRoutes.value?.map((item) => {
          return h(ElOption, { value: item, label: item })
        })
    }
  )
})
</script>
<style lang="scss" scoped></style>
