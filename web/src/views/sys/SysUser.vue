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
import type { Api, SchemaTableForm } from '@/components/schemaTableForm/types'
import type { paths } from '@/types/Schema'
import { ElAvatar, ElInput, ElMessage, ElOption, ElSelect, type TableInstance } from 'element-plus'
import { h, ref } from 'vue'
import { useRoleList } from './api/role'
import FormImgUpload from '@/components/formImgUpload/FormImgUpload.vue'
import { useAvatarDelete } from './api/user'

const api = ref<Api>({
  page: '/sys/user/page',
  list: '/sys/user/list',
  id: '/sys/user/id',
  save: '/sys/user/save',
  import: '/sys/user/import',
  delete: '/sys/user/delete'
})

const searchFormModel = ref<
  paths['/admin/sys/user/page']['post']['requestBody']['content']['application/json']
>({})

const editFormModel = ref<
  paths['/admin/sys/user/save']['post']['requestBody']['content']['application/json']
>({
  status: 1,
  password: ''
})

const tableProps = ref<TableInstance['$props']>({
  showOverflowTooltip: true
})

const tableForm = ref<
  SchemaTableForm<
    paths['/admin/sys/user/save']['post']['requestBody']['content']['application/json']
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
  avatar: {
    table: {
      show: true,
      label: '头像',
      formatter(row, column, cellValue) {
        if (cellValue) {
          return h(ElAvatar, { size: 40, src: `${import.meta.env.VITE_AVATAR_URL}/${cellValue}` })
        }
        return ''
      },
      width: 60
    },
    form: {
      searchFormShow: false,
      editFormShow: true,
      itemProps: {
        label: '头像'
      },
      itemComponent: h(FormImgUpload, {
        uploadProps: {
          action: `${import.meta.env.VITE_API_URL}/sys/user/upload`,
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          name: 'avatarFile',
          'on-error': (err) => {
            ElMessage.error(JSON.parse(err.message).message)
          },
          'on-handle-delete': (imageUrl) => {
            if (imageUrl) {
              useAvatarDelete(imageUrl)
            }
          }
        }
      })
    }
  },
  username: {
    table: {
      show: true,
      label: '用户账户',
      align: 'center'
    },
    form: {
      searchFormShow: true,
      editFormShow: true,
      formRule: [{ required: true, message: '请输入用户账户' }],
      itemProps: {
        label: '用户账户'
      },
      itemComponent: h(ElInput, { placeholder: '请输入用户账户' })
    }
  },
  realname: {
    table: {
      show: true,
      label: '用户姓名',
      align: 'center'
    },
    form: {
      searchFormShow: true,
      editFormShow: true,
      formRule: [{ required: true, message: '请输入用户姓名' }],
      itemProps: {
        label: '用户姓名'
      },
      itemComponent: h(ElInput, { placeholder: '请输入用户姓名' })
    }
  },
  password: {
    table: {
      show: false
    },
    form: {
      searchFormShow: false,
      editFormShow: true,
      formRule: [
        { required: true, message: '请输入密码' },
        { min: 8, message: '密码长度不能小于8位' },
        { max: 16, message: '密码长度不能大于16位' },
        {
          validator: (rule, value, cb) => {
            if (!/\d/.test(value)) {
              cb('密码必须包含数字')
            }
            if (!/[A-Z]/.test(value)) {
              cb('密码必须包含大写字母')
            }
            if (!/[a-z]/.test(value)) {
              cb('密码必须包含小写字母')
            }
            if (!/[!@#$%^&*()\\/`~\-_=\\[+{};:,<.>_|'"?]/.test(value)) {
              cb('密码必须包含特殊字符')
            }
            cb()
          }
        }
      ],
      itemProps: {
        label: '密码'
      },
      itemComponent: h(ElInput, { type: 'password', placeholder: '请输入密码', showPassword: true })
    }
  },
  roleIds: {
    table: {
      show: false
    },
    form: {
      searchFormShow: false,
      editFormShow: true,
      formRule: undefined,
      itemProps: {
        label: '角色'
      }
    }
  },
  email: {
    table: {
      show: true,
      label: '邮箱',
      align: 'center'
    },
    form: {
      searchFormShow: false,
      editFormShow: true,
      formRule: [
        {
          validator: (rule, value, cb) => {
            if (!value) {
              cb()
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
              cb('邮箱格式不正确')
            }
            cb()
          }
        }
      ],
      itemProps: {
        label: '邮箱'
      },
      itemComponent: h(ElInput, { type: 'email', placeholder: '请输入邮箱' })
    }
  },
  phone: {
    table: {
      show: true,
      label: '手机号',
      align: 'center'
    },
    form: {
      searchFormShow: false,
      editFormShow: true,
      formRule: [
        {
          validator: (rule, value, cb) => {
            if (!value) {
              cb()
            }
            if (!/^1[3456789]\d{9}$/.test(value)) {
              cb('手机号格式不正确')
            }
            cb()
          }
        }
      ],
      itemProps: {
        label: '手机号'
      },
      itemComponent: h(ElInput, { type: 'tel', placeholder: '请输入手机号' })
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

const { data: roleList, onFetchResponse: onRoleListResponse } = useRoleList()
onRoleListResponse(() => {
  tableForm.value.roleIds.form.itemComponent = h(
    ElSelect,
    {
      placeholder: '请选择角色',
      multiple: true,
      clearable: true,
      filterable: true
    },
    {
      default: () =>
        roleList.value?.map((item) => {
          return h(ElOption, { value: item.id as string, label: item.name })
        })
    }
  )
})
</script>
<style lang="scss" scoped></style>
