<template>
  <schemaTableForm
    v-model:search-form-model="searchFormModel"
    v-model:edit-form-model="editFormModel"
    :show-table-operations="false"
    :table-form="tableForm"
    :api="api"
  >
  </schemaTableForm>
</template>
<script setup lang="ts">
import schemaTableForm from '@/components/schemaTableForm/SchemaTableForm.vue'
import type { Api } from '@/components/schemaTableForm/types'
import type SchemaTableForm from '@/components/schemaTableForm/types'
import type { paths } from '@/types/Schema'
import { ElAvatar, ElInput } from 'element-plus'
import { h, ref } from 'vue'

const api = ref<Api>({
  page: '/admin/sys/online/list',
  id: '',
  create: '',
  update: '',
  import: '',
  delete: '',
  list: ''
})

const searchFormModel = ref<
  paths['/admin/sys/online/list']['post']['requestBody']['content']['application/json']
>({})

const editFormModel = ref({})

const tableForm = ref<
  SchemaTableForm<
    paths['/admin/sys/online/list']['post']['responses']['200']['content']['application/json']['records'][0]
  >
>({
  id: {},
  username: {
    table: {
      label: '用户账户',
      align: 'center'
    },
    searchForm: {
      props: {
        label: '用户账户'
      },
      component: h(ElInput, { placeholder: '请输入用户账户' })
    }
  },
  avatar: {
    table: {
      label: '头像',
      formatter(row, column, cellValue) {
        if (cellValue) {
          return h(ElAvatar, { size: 40, src: `${import.meta.env.VITE_UPLOAD_URL}/${cellValue}` })
        }
        return ''
      },
      align: 'center'
    }
  },
  realname: {
    table: {
      label: '用户名称',
      align: 'center'
    },
    searchForm: {
      props: {
        label: '用户名称'
      },
      component: h(ElInput, { placeholder: '请输入用户名称' })
    }
  },
  address: {
    table: {
      label: 'IP地址',
      align: 'center'
    }
  },
  loginDate: {
    table: {
      label: '登录时间',
      align: 'center'
    }
  }
})
</script>
<style scoped></style>
