<template>
  <el-table
    v-bind="props.table.props"
    v-loading="props.table.props.loading"
    v-on="{ ...props.table.events }"
  >
    <el-table-column v-if="props.table.props.showSelection" type="selection"> </el-table-column>
    <el-table-column
      v-for="(column, index) in props.table.columns"
      :key="index"
      v-bind="column"
      :prop="index"
    >
    </el-table-column>
    <el-table-column v-if="props.table.actionsProps" v-bind="props.table.actionsProps">
      <template #default="scope">
        <slot v-bind="scope"></slot>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    class="mt float-right mr mb"
    :layout="
      useSystem().breakpoints == 'xs'
        ? 'total, prev, pager, next'
        : 'total, sizes, prev, pager, next, jumper'
    "
    :page-sizes="[10, 50, 100]"
    v-bind="props.table.pagination?.props"
    :total="pagination.total"
    v-model:page-size="pagination.pageSize"
    v-model:currentPage="pagination.currentPage"
    v-on="{ ...props.table.pagination?.events }"
  />
</template>
<script setup lang="ts">
import type { FormModel } from '@/types'
import type { Pagination } from './types'
import type SchemaTable from './types'
import { useSystem } from '@/stores/useSystem'

const props = defineProps<{ table: SchemaTable<FormModel> }>()

const pagination = defineModel<Pagination>({
  required: true
})
</script>
<style scoped></style>
