<template>
  <schemaTableForm
    v-model:search-form-model="searchFormModel"
    v-model:edit-form-model="editFormModel"
    @on-table-save-success="menuListFetch"
    @on-table-delete-success="menuListFetch"
    @on-table-id-success="onMenuIdFetch"
    :table-props="tableProps"
    :table-form="tableForm"
    :api="api"
  ></schemaTableForm>
</template>
<script setup lang="ts">
import schemaTableForm from '@/components/schemaTableForm/SchemaTableForm.vue'
import type { Api, SchemaTableFormInstance } from '@/components/schemaTableForm/types'
import type SchemaTableForm from '@/components/schemaTableForm/types'
import IconSelect from '@/components/iconSelect/IconSelect.vue'
import type { paths } from '@/types/Schema'
import {
  ElIcon,
  ElInput,
  ElInputNumber,
  ElOption,
  ElRadio,
  ElRadioGroup,
  ElSelect,
  ElTreeSelect
} from 'element-plus'
import { h, ref, resolveComponent } from 'vue'
import { useInterfaceRoutes, useMenuList } from './api'
import { useComponents } from '@/hooks/useVite'
import { useMenuTree } from './hooks/useMenuTree'
const { components } = useComponents()

const api = ref<Api>({
  page: '/admin/sys/menu/page',
  id: '/admin/sys/menu/id',
  create: '/admin/sys/menu/save',
  update: '/admin/sys/menu/save',
  import: '/admin/sys/menu/import',
  delete: '/admin/sys/menu/delete',
  list: '/admin/sys/menu/list'
})

const searchFormModel = ref<
  paths['/admin/sys/menu/page']['post']['requestBody']['content']['application/json']
>({})

const editFormModel = ref<
  paths['/admin/sys/menu/save']['post']['requestBody']['content']['application/json']
>({
  menuType: 0,
  keepalive: 1,
  status: 1,
  sort: 0
})

const tableProps = ref<SchemaTableFormInstance['$props']['tableProps']>({
  props: { showOverflowTooltip: true }
})

const tableForm = ref<
  SchemaTableForm<
    paths['/admin/sys/menu/id']['get']['responses']['200']['content']['application/json']
  >
>({
  menuType: {
    editForm: {
      rule: [{ required: true, message: '请选择类型' }],
      props: {
        label: '类型'
      },
      component: h(
        ElRadioGroup,
        {
          placeholder: '请选择类型',
          onChange(value) {
            switch (value) {
              case 0:
                editFormModel.value.parentId = undefined
                editFormModel.value.perms = undefined
                editFormModel.value.openType = undefined
                break
              case 1:
                editFormModel.value.perms = undefined
                editFormModel.value.openType = undefined
                break
              case 2:
                editFormModel.value.icon = undefined
                editFormModel.value.path = undefined
                editFormModel.value.component = undefined
                editFormModel.value.openType = undefined
                break
              case 3:
                editFormModel.value.icon = undefined
                editFormModel.value.component = undefined
                editFormModel.value.path = undefined
                editFormModel.value.perms = undefined
                if (tableForm.value.parentId?.editForm?.rule) {
                  tableForm.value.parentId.editForm.rule[0].required = false
                }
                editFormModel.value.openType = 1
                break
              default:
                break
            }
          }
        },
        {
          default: () => [
            h(ElRadio, { label: 0 }, { default: () => '一级菜单' }),
            h(ElRadio, { label: 1 }, { default: () => '子菜单' }),
            h(ElRadio, { label: 2 }, { default: () => '权限' }),
            h(ElRadio, { label: 3 }, { default: () => '外部链接' })
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
      label: '名称'
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
  icon: {
    table: {
      label: '图标',
      align: 'center',
      formatter(row, column, cellValue) {
        if (cellValue) {
          return h(ElIcon, { size: 24 }, { default: () => h(resolveComponent(cellValue)) })
        }
        return ''
      }
    },
    editForm: {
      props: {
        label: '图标'
      },
      component: h(IconSelect),
      vIf(value) {
        if (value.menuType == 2) {
          return false
        }
        return true
      }
    }
  },
  parentId: {
    editForm: {
      rule: [{ required: true, message: '请选择父级菜单' }],
      props: {
        label: '父级菜单'
      },
      vIf(formModel) {
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
  openType: {
    editForm: {
      rule: [{ required: true, message: '请选择打开方式' }],
      props: {
        label: '打开方式'
      },
      component: h(
        ElRadioGroup,
        {
          placeholder: '请选择打开方式',
          clearable: true,
          filterable: true
        },
        {
          default: () => [
            h(ElRadio, { label: 0 }, { default: () => '内部打开' }),
            h(ElRadio, { label: 1 }, { default: () => '外部打开' })
          ]
        }
      ),
      vIf(value) {
        if (value.menuType == 3) {
          return true
        }
        return false
      }
    }
  },
  component: {
    table: {
      label: '组件',
      align: 'center'
    },
    editForm: {
      rule: [{ message: '请输入组件' }],
      props: {
        label: '组件'
      },
      component: h(
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
      vIf(value) {
        if ([2, 3].includes(value.menuType)) {
          return false
        }
        return true
      }
    }
  },
  path: {
    table: {
      label: '路径',
      align: 'center'
    },
    editForm: {
      props: {
        label: '路径'
      },
      component: h(ElInput, {
        placeholder: '请输入路径',
        onInput(value) {
          if ([0, 1].includes(editFormModel.value.menuType) && value && !value.startsWith('/')) {
            editFormModel.value.path = '/' + value
          }
        }
      }),
      vIf(value) {
        if (value.menuType == 2) {
          return false
        }
        return true
      }
    }
  },
  perms: {
    table: {
      label: '权限',
      align: 'center',
      exportFormatter(value) {
        if (value) {
          return value.join(',')
        }
        return value
      }
    },
    editForm: {
      rule: [{ required: true, message: '请选择权限' }],
      props: {
        label: '权限'
      },
      vIf(value) {
        if (value.menuType != 2) {
          return false
        }
        return true
      }
    }
  },
  keepalive: {
    table: {
      label: '缓存',
      align: 'center',
      formatter(row, column, cellValue) {
        return cellValue === 1 ? '是' : '否'
      },
      exportFormatter(value) {
        return value === 1 ? '是' : '否'
      }
    },
    editForm: {
      rule: [{ required: true, message: '请选择缓存' }],
      props: {
        label: '缓存'
      },
      component: h(
        ElSelect,
        { placeholder: '请选择缓存' },
        {
          default: () => [
            h(ElOption, { label: '是', value: 1 }),
            h(ElOption, { label: '否', value: 0 })
          ]
        }
      ),
      vIf(value) {
        if (![2, 3].includes(value.menuType)) {
          return true
        }
        return false
      },
      importFormatter(value) {
        return value === '是' ? 1 : 0
      }
    }
  },
  status: {
    table: {
      label: '状态',
      align: 'center',
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
      component: h(ElInputNumber, { placeholder: '排序' })
    }
  }
})

const {
  data: menuList,
  execute: menuListFetch,
  onFetchResponse: onMenuListResponse
} = useMenuList()
onMenuListResponse(() => {
  const options = useMenuTree(
    menuList.value?.filter(
      (item) => item.menuType != 2
    ) as paths['/admin/sys/menu/list']['post']['responses']['200']['content']['application/json']
  )
  tableForm.value.parentId!.editForm!.component = h(ElTreeSelect, {
    placeholder: '请选择父级菜单',
    data: options,
    checkStrictly: true
  })
})

const { data: interfaceRoutes, onFetchResponse: onInterfaceRoutesResponse } = useInterfaceRoutes()
onInterfaceRoutesResponse(() => {
  tableForm.value.perms!.editForm!.component = h(
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

const onMenuIdFetch = () => {
  console.log(editFormModel.value.menuType)
  if (editFormModel.value.menuType == 3) {
    if (tableForm.value.parentId?.editForm?.rule) {
      tableForm.value.parentId.editForm.rule[0].required = false
    }
  }
}
</script>
<style scoped></style>
