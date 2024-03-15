<template>
  <schemaTableForm
    ref="schemaTableFormRef"
    v-model:search-form-model="searchFormModel"
    v-model:edit-form-model="editFormModel"
    :table-props="tableProps"
    :table-form="tableForm"
    :api="api"
  >
    <template #tableButtons="scope">
      <el-button
        type="success"
        v-permissions="api.id"
        text
        size="default"
        @click="schemaTableFormRef?.handleDialog('查看', scope.row)"
        >查看</el-button
      >
      <el-button
        type="primary"
        v-permissions="api.update"
        text
        size="default"
        @click="schemaTableFormRef?.handleDialog('编辑', scope.row)"
        >编辑</el-button
      >
      <el-button
        type="primary"
        v-permissions="`/admin/sys/user/password`"
        text
        size="default"
        @click="handlePsw(scope.row)"
        >修改密码</el-button
      >
      <el-popconfirm title="确定删除？" @confirm="schemaTableFormRef?.handleDelete(scope.row)">
        <template #reference>
          <el-button v-permissions="api.delete" type="danger" text size="default">删除</el-button>
        </template>
      </el-popconfirm>
    </template>
  </schemaTableForm>
  <el-dialog v-model="show" :title="`${updatePswUser}：修改密码`">
    <schemaForm
      v-loading="pswConfirmLoading"
      ref="updatePswFormRef"
      v-model="updatePswModel"
      :form="updatePswForm"
    ></schemaForm>
    <template #footer>
      <span class="dialog-footer">
        <el-button :loading="pswConfirmLoading" @click="show = false">取消</el-button>
        <el-button :loading="pswConfirmLoading" type="primary" @click="confirmUpdatePassword"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import schemaTableForm from '@/components/schemaTableForm/SchemaTableForm.vue'
import schemaForm from '@/components/schemaForm/SchemaForm.vue'
import type {
  Api,
  SchemaTableForm,
  SchemaTableFormInstance
} from '@/components/schemaTableForm/types'
import type { paths } from '@/types/Schema'
import { ElAvatar, ElInput, ElMessage, ElOption, ElSelect } from 'element-plus'
import { h, ref, watch } from 'vue'
import { useRoleList } from './api/role'
import FormImgUpload from '@/components/formImgUpload/FormImgUpload.vue'
import { useAvatarDelete } from './api/user'
import { useUser } from '@/stores/useUser'
import type SchemaForm from '@/components/schemaForm/types'
import type { SchemaFormInstance } from '@/components/schemaForm/types'
import { useFetch } from '@/hooks/useFetch'

const api = ref<Api>({
  page: '/admin/sys/user/page',
  list: '/admin/sys/user/list',
  id: '/admin/sys/user/id',
  create: '/admin/sys/user/create',
  update: '/admin/sys/user/update',
  import: '/admin/sys/user/import',
  delete: '/admin/sys/user/delete'
})

const schemaTableFormRef = ref<SchemaTableFormInstance>()

const searchFormModel = ref<
  paths['/admin/sys/user/page']['post']['requestBody']['content']['application/json']
>({})

const editFormModel = ref<
  paths['/admin/sys/user/create']['post']['requestBody']['content']['application/json'] & {
    id?: string
  }
>({
  status: 1,
  password: ''
})

const tableProps = ref<SchemaTableFormInstance['$props']['tableProps']>({
  props: { showOverflowTooltip: true },
  actionProps: { width: 400 }
})

const tableForm = ref<
  SchemaTableForm<
    paths['/admin/sys/user/create']['post']['requestBody']['content']['application/json']
  >
>({
  avatar: {
    table: {
      label: '头像',
      formatter(row, column, cellValue) {
        if (cellValue) {
          return h(ElAvatar, { size: 40, src: `${import.meta.env.VITE_AVATAR_URL}/${cellValue}` })
        }
        return ''
      },
      width: 60
    },
    editForm: {
      props: {
        label: '头像'
      },
      component: h(FormImgUpload, {
        uploadProps: {
          action: `${import.meta.env.VITE_API_URL}/admin/sys/user/upload`,
          headers: { Authorization: `Bearer ${useUser().token}` },
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
      label: '用户账户',
      align: 'center'
    },
    editForm: {
      rule: [{ required: true, message: '请输入用户账户' }],
      props: {
        label: '用户账户'
      },
      component: h(ElInput, {
        placeholder: '请输入用户账户'
      })
    },
    searchForm: {
      props: {
        label: '用户账户'
      },
      component: h(ElInput, {
        placeholder: '请输入用户账户'
      })
    }
  },
  realname: {
    table: {
      label: '用户姓名',
      align: 'center'
    },
    editForm: {
      rule: [{ required: true, message: '请输入用户姓名' }],
      props: {
        label: '用户姓名'
      },
      component: h(ElInput, { placeholder: '请输入用户姓名' })
    },
    searchForm: {
      props: {
        label: '用户姓名'
      },
      component: h(ElInput, { placeholder: '请输入用户姓名' })
    }
  },
  password: {
    editForm: {
      rule: [
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
      props: {
        label: '密码'
      },
      component: h(ElInput, { type: 'password', placeholder: '请输入密码', showPassword: true })
    }
  },
  roleIds: {
    editForm: {
      props: {
        label: '角色'
      }
    }
  },
  email: {
    table: {
      label: '邮箱',
      align: 'center'
    },
    editForm: {
      rule: [
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
      props: {
        label: '邮箱'
      },
      component: h(ElInput, { type: 'email', placeholder: '请输入邮箱' })
    }
  },
  phone: {
    table: {
      label: '手机号',
      align: 'center'
    },
    editForm: {
      rule: [
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
      props: {
        label: '手机号'
      },
      component: h(ElInput, { type: 'tel', placeholder: '请输入手机号' })
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
  }
})

const { data: roleList, onFetchResponse: onRoleListResponse } = useRoleList()
onRoleListResponse(() => {
  tableForm.value.roleIds!.editForm!.component = h(
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

watch(
  editFormModel,
  (value) => {
    if (value.id) {
      tableForm.value.username!.editForm!.component = h(ElInput, {
        disabled: true,
        placeholder: '请输入用户账户'
      })
      tableForm.value.password!.editForm!.component = undefined
      tableForm.value.password!.editForm!.vIf = () => false
    } else {
      tableForm.value.username!.editForm!.component = h(ElInput, { placeholder: '请输入用户账户' })
      tableForm.value.password!.editForm!.component = h(ElInput, {
        type: 'password',
        placeholder: '请输入密码',
        showPassword: true
      })
      tableForm.value.password!.editForm!.vIf = () => true
    }
  },
  { deep: true }
)

const show = ref(false)
const updatePswUser = ref('')
const updatePswFormRef = ref<SchemaFormInstance>()
const updatePswModel = ref<
  paths['/admin/sys/user/password']['post']['requestBody']['content']['application/json']
>({
  id: '',
  password: '',
  confirmPassword: ''
})
const updatePswForm = ref<
  SchemaForm<
    paths['/admin/sys/user/password']['post']['requestBody']['content']['application/json']
  >
>({
  props: {
    labelSuffix: '：',
    labelWidth: '100px',
    labelPosition: 'left',
    rules: {
      password: [
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
      confirmPassword: [
        { required: true, message: '请确认密码' },
        {
          validator: (rule, value, cb) => {
            if (value !== updatePswModel.value.password) {
              cb('两次密码不一致')
            }
            cb()
          }
        }
      ]
    }
  },
  formItems: {
    password: {
      props: {
        label: '密码'
      },
      component: h(ElInput, { type: 'password', placeholder: '请输入密码' })
    },
    confirmPassword: {
      props: {
        label: '确认密码'
      },
      component: h(ElInput, { type: 'password', placeholder: '请确认密码' })
    }
  }
})
const handlePsw = (
  user: paths['/admin/sys/user/id']['get']['responses']['200']['content']['application/json']
) => {
  show.value = true
  updatePswModel.value.id = user.id as string
  updatePswUser.value = user.username as string
}
const pswConfirmLoading = ref(false)
const confirmUpdatePassword = async () => {
  try {
    pswConfirmLoading.value = true
    await updatePswFormRef.value?.formRef?.validate()
    await useFetch('/admin/sys/user/password', { immediate: false })
      .post(updatePswModel.value)
      .execute(true)
    ElMessage.success('密码修改成功')
    show.value = false
  } catch (error) {
    console.error(error)
  } finally {
    pswConfirmLoading.value = false
  }
}
</script>
<style scoped></style>
