<template>
  <schemaForm ref="searchFormRef" v-model="searchFormModel" :form="searForm"> </schemaForm>
  <div class="mt flex">
    <el-button type="primary" icon="CirclePlus" @click="handleDialog('新增', {})">新增</el-button>
    <el-upload class="ml" :http-request="handleImport">
      <el-button type="primary" plain icon="Upload">导入</el-button>
    </el-upload>
    <el-button
      class="ml"
      type="success"
      plain
      icon="Download"
      :loading="exportLoading"
      @click="handleExport"
      >导出</el-button
    >
  </div>
  <div class="mt">
    <schemaTable :table="table" v-model="pagination">
      <template #default="scope">
        <el-button type="success" text size="default" @click="handleDialog('查看', scope.row)"
          >查看</el-button
        >
        <el-button type="primary" text size="default" @click="handleDialog('编辑', scope.row)"
          >编辑</el-button
        >
        <el-popconfirm title="确定删除？" @confirm="handleDelete(scope.row)">
          <template #reference>
            <el-button type="danger" text size="default">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </schemaTable>
  </div>
  <div>
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="60%">
      <schemaForm
        v-loading="saveLoading"
        ref="editFormRef"
        v-model="editFormModel"
        :form="editForm"
      >
      </schemaForm>
      <template #footer>
        <el-button @click="() => (dialogVisible = false)">取消</el-button>
        <el-button
          v-if="dialogTitle != '查看'"
          type="primary"
          @click="handleEdit"
          :loading="saveLoading"
          >确定</el-button
        >
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import type { FormModel } from '@/types'
import schemaForm from '../schemaForm/schemaForm.vue'
import schemaTable from '@/components/schemaTable/schemaTable.vue'
import type SchemaTableForm from './types'
import { computed, h, nextTick, ref, defineProps } from 'vue'
import type SchemaForm from '@/components/schemaForm/types'
import type SchemaTable from '@/components/schemaTable/types'
import type { Pagination } from '@/components/schemaTable/types'
import type { FormRules, UploadRequestOptions } from 'element-plus'
import type { FormItemCompanents, SchemaFormInstance } from '@/components/schemaForm/types'
import type { Api } from './types'
import { tableDelete, tableExport, tableId, tableList, tableSave } from './api'
import { has, omit } from 'lodash-es'
import { utils, writeFileXLSX, read } from 'xlsx'

const props = defineProps<{
  tableForm: SchemaTableForm<FormModel>
  api: Api
}>()

const pagination = ref<Pagination>({
  pageSize: 10,
  currentPage: 1,
  total: 0
})

/**
 * 搜索表单数据
 */
const searchFormModel = ref<FormModel>({})
const searchFormQuery = computed(() => {
  return {
    ...searchFormModel.value,
    ...omit(pagination.value, ['total'])
  }
})
const {
  data: tableData,
  isFetching: tableLoading,
  onFetchResponse: tableListOnFetchResponse,
  execute: tableListFetch
} = tableList(props.api.page, searchFormQuery)
tableListFetch()
tableListOnFetchResponse(() => {
  pagination.value.total = tableData.value?.total || 0
})
/**
 * 表格配置
 */
const table = computed(() => {
  const tableProps: SchemaTable<FormModel> = {
    props: {
      data: tableData.value?.records ? tableData.value.records : [],
      loading: tableLoading.value
    },
    columns: {},
    actionsProps: {
      label: '操作',
      width: 300,
      align: 'center'
    },
    pagination: {
      events: {
        change: () => {
          tableListFetch()
        }
      }
    }
  }
  for (const key in props.tableForm) {
    if (props.tableForm[key]?.table.show) {
      tableProps.columns[key] = props.tableForm[key]?.table
    }
  }
  return tableProps
})

/**
 * 搜索表单
 */
const searchFormRef = ref<SchemaFormInstance>()
/**
 * 搜索表单配置
 */
const searForm = computed(() => {
  const formProps: SchemaForm<FormModel> = {
    props: { inline: true },
    formItems: {},
    buttons: [
      {
        props: {
          type: 'primary'
        },
        slots: {
          default: [h('span', '查询')]
        },
        events: {
          async click() {
            try {
              await searchFormRef.value?.formRef?.validate()
              await tableListFetch()
            } catch (error) {
              console.log(error)
            }
          }
        }
      },
      {
        props: {
          type: 'default'
        },
        slots: {
          default: [h('span', '重置')]
        },
        events: {
          click() {
            searchFormRef.value?.formRef?.resetFields()
            pagination.value.currentPage = 1
            pagination.value.pageSize = 10
            tableListFetch()
          }
        }
      }
    ]
  }
  for (const key in props.tableForm) {
    if (props.tableForm[key].form.searchFormShow) {
      formProps.formItems[key] = {
        props: props.tableForm[key].form.itemProps,
        component: props.tableForm[key].form.itemComponent as FormItemCompanents,
        componentProps: props.tableForm[key].form.itemComponentProps,
        componentEvents: props.tableForm[key].form.itemComponentEvents,
        componentSlots: props.tableForm[key].form.itemComponentSlots
      }
    }
  }
  return formProps
})

/**
 * 编辑表单
 */
const editFormRef = ref<SchemaFormInstance>()
/**
 * 编辑表单数据
 */
const editFormModel = ref<FormModel>({})
/**
 * 编辑表单配置
 */
const editForm = computed(() => {
  const formProps: SchemaForm<FormModel> = {
    props: {
      labelWidth: 100,
      labelSuffix: '：'
    },
    formItems: {},
    buttons: []
  }
  const rulues: FormRules<FormModel> = {}
  for (const key in props.tableForm) {
    rulues[key] = props.tableForm[key].form?.formRule
    if (props.tableForm[key].form.editFormShow) {
      formProps.formItems[key] = {
        props: props.tableForm[key].form.itemProps,
        component: props.tableForm[key].form.itemComponent as FormItemCompanents,
        componentProps: props.tableForm[key].form.itemComponentProps,
        componentEvents: props.tableForm[key].form.itemComponentEvents,
        componentSlots: props.tableForm[key].form.itemComponentSlots
      }
    }
  }
  formProps.props.rules = rulues
  return formProps
})

/**
 * 弹框
 */
const dialogVisible = ref(false)
/**
 * 弹框标题
 */
const dialogTitle = ref('新增')
/**
 * 开启弹框
 * @param title 标题
 * @param form 表单数据
 */
const handleDialog = async (title: '新增' | '编辑' | '查看', form: FormModel) => {
  dialogTitle.value = title
  dialogVisible.value = true
  Object.assign(editForm.value.props, { disabled: false })
  if (title == '查看') {
    Object.assign(editForm.value.props, { disabled: true })
  }
  await nextTick()
  editFormRef.value?.formRef?.resetFields()
  if (title === '编辑' || title === '查看') {
    const { data } = await tableId(props.api.id, form.id)
    Object.assign(editFormModel.value, data.value)
  }
}

const { isFetching: saveLoading, execute: tableSaveFetch } = tableSave(props.api.save, {
  list: [editFormModel.value]
})
const handleEdit = async () => {
  try {
    await editFormRef.value?.formRef?.validate()
    await tableSaveFetch(true)
    dialogVisible.value = false
    await tableListFetch()
  } catch (error) {
    console.log(error)
  }
}

/**
 * 删除
 * @param value 数据
 */
const handleDelete = async (value: FormModel) => {
  try {
    tableLoading.value = true
    await tableDelete(props.api.delete, { id: [value.id] })
    await tableListFetch()
  } catch (error) {
    console.log(error)
  } finally {
    tableLoading.value = false
  }
}

const {
  isFetching: exportLoading,
  data: exportData,
  execute: tableExportFetch
} = tableExport(props.api.list, searchFormModel.value)
/**
 * 导出
 */
const handleExport = async () => {
  try {
    await tableExportFetch(true)
    const exportDataSheet: FormModel[] = []
    if (exportData.value?.length) {
      exportData.value.forEach((item, index) => {
        const exportItem: FormModel = {}
        for (const key in item) {
          if (has(props.tableForm, key) && props.tableForm[key].table.show) {
            exportItem[props.tableForm[key].table.label as string] = item[key]
            if (has(props.tableForm[key].table, 'formatter')) {
              //@ts-ignore
              exportItem[props.tableForm[key].table.label as string] = props.tableForm[
                key
              ].table.formatter(item, undefined as any, item[key], index)
            }
          }
        }
        exportDataSheet.push(exportItem)
      })
    }
    const worksheet = utils.json_to_sheet(exportDataSheet)
    const workbook = utils.book_new()
    utils.book_append_sheet(workbook, worksheet, 'Sheet1')
    writeFileXLSX(workbook, `表格导出.xlsx`)
  } catch (error) {
    console.log(error)
  }
}

const handleImport = async (options: UploadRequestOptions) => {
  const ab = await options.file.arrayBuffer()
  const wb = read(ab)
  const ws = wb.Sheets[wb.SheetNames[0]]
  const data = utils.sheet_to_json(ws)
  console.log('🚀 ~ handleImport ~ data:', data)
}
</script>
<style lang="scss" scoped></style>
