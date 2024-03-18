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
        @click="handleInfo(scope.row)"
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
  <el-dialog v-model="pswDialogShow" :title="`${updatePswUser}：修改密码`">
    <schemaForm
      v-loading="pswConfirmLoading"
      ref="updatePswFormRef"
      v-model="updatePswModel"
      :form="updatePswForm"
    ></schemaForm>
    <template #footer>
      <span class="dialog-footer">
        <el-button :loading="pswConfirmLoading" @click="pswDialogShow = false">取消</el-button>
        <el-button :loading="pswConfirmLoading" type="primary" @click="confirmUpdatePassword"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="infoDialogShow" :title="`${updateInfoUser}：修改信息`">
    <schemaForm
      v-loading="infoConfirmLoading"
      ref="updateInfoFormRef"
      v-model="updateInfoModel"
      :form="updateInfoForm"
    ></schemaForm>
    <template #footer>
      <span class="dialog-footer">
        <el-button :loading="infoConfirmLoading" @click="infoDialogShow = false">取消</el-button>
        <el-button :loading="infoConfirmLoading" type="primary" @click="confirmUpdateInfo"
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
import { ElAvatar, ElInput, ElMessage, ElOption, ElSelect, type FormItemRule } from 'element-plus'
import { h, ref, type VNode } from 'vue'
import { useRoleList } from './api/role'
import FormImgUpload from '@/components/formImgUpload/FormImgUpload.vue'
import { useAvatarDelete } from './api/user'
import { useUser } from '@/stores/useUser'
import type SchemaForm from '@/components/schemaForm/types'
import type { SchemaFormInstance } from '@/components/schemaForm/types'
import { useFetch } from '@/hooks/useFetch'
import { omit } from 'lodash-es'

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

type ItemComponent = {
  label: string
  rule?: FormItemRule[]
  component?: VNode
}

const avatarComponent: ItemComponent = {
  label: '头像',
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

const usernameComponent: ItemComponent = {
  label: '用户账户',
  rule: [{ required: true, message: '请输入用户账户' }],
  component: h(ElInput, { placeholder: '请输入用户账户' })
}

const realnameComponent: ItemComponent = {
  label: '用户姓名',
  rule: [{ required: true, message: '请输入用户姓名' }],
  component: h(ElInput, { placeholder: '请输入用户姓名' })
}

const passwordComponent: ItemComponent = {
  label: '密码',
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
  component: h(ElInput, { type: 'password', placeholder: '请输入密码', showPassword: true })
}

const roleIdsComponent: ItemComponent = {
  label: '角色'
}

const emailComponent: ItemComponent = {
  label: '邮箱',
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
  component: h(ElInput, { type: 'email', placeholder: '请输入邮箱' })
}

const phoneComponent: ItemComponent = {
  label: '手机号',
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
  component: h(ElInput, { type: 'tel', placeholder: '请输入手机号' })
}

const statusComponent: ItemComponent = {
  label: '状态',
  rule: [{ required: true, message: '请选择状态' }],
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

const tableForm = ref<
  SchemaTableForm<
    paths['/admin/sys/user/create']['post']['requestBody']['content']['application/json']
  >
>({
  avatar: {
    table: {
      label: avatarComponent.label,
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
        label: avatarComponent.label
      },
      component: avatarComponent.component
    }
  },
  username: {
    table: {
      label: usernameComponent.label,
      align: 'center'
    },
    editForm: {
      rule: usernameComponent.rule,
      props: {
        label: usernameComponent.label
      },
      component: usernameComponent.component
    },
    searchForm: {
      props: {
        label: usernameComponent.label
      },
      component: usernameComponent.component
    }
  },
  realname: {
    table: {
      label: realnameComponent.label,
      align: 'center'
    },
    editForm: {
      rule: realnameComponent.rule,
      props: {
        label: realnameComponent.label
      },
      component: realnameComponent.component
    },
    searchForm: {
      props: {
        label: realnameComponent.label
      },
      component: realnameComponent.component
    }
  },
  password: {
    editForm: {
      rule: passwordComponent.rule,
      props: {
        label: passwordComponent.label
      },
      component: passwordComponent.component
    }
  },
  roleIds: {
    editForm: {
      props: {
        label: roleIdsComponent.label
      },
      component: roleIdsComponent.component
    }
  },
  email: {
    table: {
      label: emailComponent.label,
      align: 'center'
    },
    editForm: {
      rule: emailComponent.rule,
      props: {
        label: emailComponent.label
      },
      component: emailComponent.component
    }
  },
  phone: {
    table: {
      label: phoneComponent.label,
      align: 'center'
    },
    editForm: {
      rule: phoneComponent.rule,
      props: {
        label: phoneComponent.label
      },
      component: phoneComponent.component
    }
  },
  status: {
    table: {
      label: statusComponent.label,
      align: 'center',
      formatter(row, column, cellValue) {
        return cellValue === 1 ? '启用' : '停用'
      },
      exportFormatter(value) {
        return value === 1 ? '启用' : '停用'
      }
    },
    editForm: {
      rule: statusComponent.rule,
      props: {
        label: statusComponent.label
      },
      component: statusComponent.component,
      importFormatter(value) {
        return value === '启用' ? 1 : 0
      }
    },
    searchForm: {
      props: {
        label: statusComponent.label
      },
      component: statusComponent.component
    }
  }
})

const pswDialogShow = ref(false)
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
      password: passwordComponent.rule,
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
      component: passwordComponent.component as VNode
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
  pswDialogShow.value = true
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
    pswDialogShow.value = false
  } catch (error) {
    console.error(error)
  } finally {
    pswConfirmLoading.value = false
  }
}

const infoDialogShow = ref(false)
const infoConfirmLoading = ref(false)
const updateInfoUser = ref('')
const updateInfoFormRef = ref<SchemaFormInstance>()
const updateInfoModel = ref<
  paths['/admin/sys/user/update']['post']['requestBody']['content']['application/json']
>({})
const updateInfoForm = ref<
  SchemaForm<paths['/admin/sys/user/update']['post']['requestBody']['content']['application/json']>
>({
  props: {
    labelSuffix: '：',
    labelWidth: '100px',
    labelPosition: 'left',
    rules: {
      realname: realnameComponent.rule,
      email: emailComponent.rule,
      phone: phoneComponent.rule,
      status: statusComponent.rule
    }
  },
  formItems: {
    avatar: {
      props: {
        label: avatarComponent.label
      },
      component: avatarComponent.component as VNode
    },
    realname: {
      props: {
        label: realnameComponent.label
      },
      component: realnameComponent.component as VNode
    },
    roleIds: {
      props: {
        label: roleIdsComponent.label
      },
      component: roleIdsComponent.component as VNode
    },
    email: {
      props: {
        label: emailComponent.label
      },
      component: emailComponent.component as VNode
    },
    phone: {
      props: {
        label: phoneComponent.label
      },
      component: phoneComponent.component as VNode
    },
    status: {
      props: {
        label: statusComponent.label
      },
      component: statusComponent.component as VNode
    }
  }
})
const handleInfo = async (
  user: paths['/admin/sys/user/list']['post']['responses']['200']['content']['application/json'][0]
) => {
  const { data, error } = await useFetch<
    paths['/admin/sys/user/id']['get']['responses']['200']['content']['application/json']
  >(`${api.value.id}?id=${user.id}`).get()
  if (error.value) {
    return
  }
  infoDialogShow.value = true
  updateInfoUser.value = data.value?.username as string
  Object.assign(updateInfoModel.value, omit(data.value, ['username']))
}

const confirmUpdateInfo = async () => {
  try {
    infoConfirmLoading.value = true
    await updateInfoFormRef.value?.formRef?.validate()
    await useFetch(api.value.update, { immediate: false }).post(updateInfoModel.value).execute(true)
    ElMessage.success('信息修改成功')
    await schemaTableFormRef.value?.handleSearch()
    infoDialogShow.value = false
  } catch (error) {
    console.error(error)
  } finally {
    infoConfirmLoading.value = false
  }
}

const { data: roleList, onFetchResponse: onRoleListResponse } = useRoleList()
onRoleListResponse(() => {
  const component = h(
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
  tableForm.value.roleIds!.editForm!.component = component
  updateInfoForm.value.formItems.roleIds!.component = component
})
</script>
<style scoped></style>
