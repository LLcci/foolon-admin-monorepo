<template>
  <schemaTable :table="table" v-model="pagination">
    <template #default="scope">
      <el-button type="primary" @click="handleEdit(scope.row)">编辑</el-button>
      <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
    </template>
  </schemaTable>
</template>
<script setup lang="ts">
import schemaTable from '@/components/schemaTable/SchemaTable.vue'
import type { Pagination } from '@/components/schemaTable/types'
import type SchemaTable from '@/components/schemaTable/types'
import { ref } from 'vue'

type TableData = {
  id: number
  name: string
  age: number
}

const table = ref<SchemaTable<TableData>>({
  props: {
    border: true,
    data: [
      { id: 1, name: 'John', age: 18 },
      { id: 2, name: 'saber', age: 18 }
    ]
  },
  columns: {
    name: {
      align: 'center',
      label: 'Name',
      formatter: (value) => {
        return `${value.name}2233`
      }
    },
    age: {
      align: 'center',
      label: 'Age'
    }
  },
  actionsProps: {
    label: '操作',
    align: 'center'
  },
  pagination: {
    events: {
      change() {
        console.log('🚀 ~ change ~ page:', pagination.value)
      }
    }
  }
})

const pagination = ref<Pagination>({
  pageSize: 10,
  currentPage: 1,
  total: 1000
})

const handleEdit = (row: TableData) => {
  console.log('🚀 ~ handleEdit ~ row:', row)
}

const handleDelete = (row: TableData) => {
  console.log('🚀 ~ handleDelete ~ row:', row)
}
</script>
<style scoped></style>
