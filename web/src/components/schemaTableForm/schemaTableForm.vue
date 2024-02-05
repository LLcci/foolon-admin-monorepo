<template>
  <schemaForm ref="searchFormRef" v-model="searchFormModel" :form="searForm">
    <el-button type="primary" v-permissions="props.api.page" @click="handleSearch">查询</el-button>
    <el-button type="default" v-permissions="props.api.page" @click="handleReset">重置</el-button>
  </schemaForm>
  <div class="mt flex justify-between">
    <div class="flex">
      <el-button
        type="primary"
        icon="CirclePlus"
        v-permissions="props.api.save"
        @click="handleDialog('新增', {})"
        >新增</el-button
      >
      <el-button
        class="ml"
        type="success"
        plain
        icon="Download"
        v-permissions="props.api.list"
        :loading="exportLoading"
        @click="handleExport"
        >导出</el-button
      >
      <el-upload class="ml" v-permissions="props.api.save" :http-request="handleImport">
        <el-button type="primary" plain icon="Upload">导入</el-button>
        <template #tip>
          <el-button type="primary" text icon="Download" @click="handleExportTemplate"
            >导入模板</el-button
          >
        </template>
      </el-upload>
    </div>
    <div>
      <el-popconfirm title="确定删除？" @confirm="handleMultipleDelete(selectionColumns)">
        <template #reference>
          <el-button
            type="danger"
            v-permissions="props.api.delete"
            :disabled="!selectionColumns.length"
            size="default"
            >批量删除</el-button
          >
        </template>
      </el-popconfirm>
    </div>
  </div>
  <div class="mt">
    <schemaTable :table="table" v-model="pagination">
      <template #default="scope">
        <el-button
          type="success"
          v-permissions="props.api.id"
          text
          size="default"
          @click="handleDialog('查看', scope.row)"
          >查看</el-button
        >
        <el-button
          type="primary"
          v-permissions="props.api.save"
          text
          size="default"
          @click="handleDialog('编辑', scope.row)"
          >编辑</el-button
        >
        <el-popconfirm title="确定删除？" @confirm="handleDelete(scope.row)">
          <template #reference>
            <el-button v-permissions="props.api.delete" type="danger" text size="default"
              >删除</el-button
            >
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
        <div></div>
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
import { computed, nextTick, ref, type VNode } from 'vue'
import type SchemaForm from '@/components/schemaForm/types'
import type SchemaTable from '@/components/schemaTable/types'
import type { Pagination } from '@/components/schemaTable/types'
import {
  ElMessage,
  type FormProps,
  type FormRules,
  type TableColumnInstance,
  type UploadRequestOptions
} from 'element-plus'
import type { SchemaFormInstance } from '@/components/schemaForm/types'
import type { Api } from './types'
import { tableDelete, tableExport, tableId, tableList, tableSave } from './api'
import { has, omit } from 'lodash-es'
import { utils, writeFileXLSX, read } from 'xlsx'

const props = defineProps<{
  tableForm: SchemaTableForm<any>
  tableProps?: TableColumnInstance['$props']
  searchFormProps?: Partial<FormProps>
  editFormProps?: Partial<FormProps>
  api: Api
}>()

const emits = defineEmits([
  'onTableListSuccess',
  'onTableSaveSuccess',
  'onTableDeleteSuccess',
  'onTableExportSuccess',
  'onTableIdSuccess'
])

const pagination = ref<Pagination>({
  pageSize: 10,
  currentPage: 1,
  total: 0
})

/**
 * 搜索表单数据
 */
const searchFormModel = defineModel<Record<string, any>>('searchFormModel', { required: true })
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
  emits('onTableListSuccess')
  pagination.value.total = tableData.value?.total || 0
})
/**
 * 表格配置
 */
const selectionColumns = ref<FormModel[]>([])
const table = computed(() => {
  const tableProps: SchemaTable<FormModel> = {
    props: {
      data: tableData.value?.records ? tableData.value.records : [],
      loading: tableLoading.value,
      showSelection: true,
      rowKey: 'id',
      defaultExpandAll: true
    },
    columns: {},
    actionsProps: {
      label: '操作',
      width: 300,
      align: 'center'
    },
    pagination: {
      events: {
        change: async () => {
          await tableListFetch()
        }
      }
    },
    events: {
      'selection-change': (selection) => {
        selectionColumns.value = selection
      }
    }
  }
  for (const key in props.tableForm) {
    if (props.tableForm[key]?.table.show) {
      tableProps.columns[key] = props.tableForm[key]?.table
    }
  }
  Object.assign(tableProps.props, props.tableProps)
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
    formItems: {}
  }
  for (const key in props.tableForm) {
    if (props.tableForm[key].form.searchFormShow) {
      formProps.formItems[key] = {
        props: props.tableForm[key].form.itemProps,
        component: props.tableForm[key].form.itemComponent as VNode
      }
    }
  }
  Object.assign(formProps.props, props.searchFormProps)
  return formProps
})
const handleSearch = async () => {
  try {
    await searchFormRef.value?.formRef?.validate()
    await tableListFetch()
  } catch (error) {
    console.log(error)
  }
}
const handleReset = () => {
  searchFormRef.value?.formRef?.resetFields()
  pagination.value.currentPage = 1
  pagination.value.pageSize = 10
}

/**
 * 编辑表单
 */
const editFormRef = ref<SchemaFormInstance>()
/**
 * 编辑表单数据
 */
const editFormModel = defineModel<Record<string, any>>('editFormModel', { required: true })
/**
 * 编辑表单配置
 */
const editForm = computed(() => {
  const formProps: SchemaForm<FormModel> = {
    props: {
      labelWidth: 100,
      labelSuffix: '：'
    },
    formItems: {}
  }
  const rulues: FormRules<FormModel> = {}
  for (const key in props.tableForm) {
    rulues[key] = props.tableForm[key].form?.formRule
    if (props.tableForm[key].form.editFormShow) {
      formProps.formItems[key] = {
        props: props.tableForm[key].form.itemProps,
        component: props.tableForm[key].form.itemComponent as VNode,
        vIf: props.tableForm[key].form.editFormVIf
      }
    }
  }
  formProps.props.rules = rulues
  Object.assign(formProps.props, props.editFormProps)
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
  editFormModel.value.id = undefined
  if (title === '编辑' || title === '查看') {
    const { data } = await tableId(props.api.id, form.id)
    emits('onTableIdSuccess')
    Object.assign(editFormModel.value, data.value)
  }
}

const {
  isFetching: saveLoading,
  execute: tableSaveFetch,
  onFetchResponse: tableSaveOnFetchResponse
} = tableSave(props.api.save, {
  list: [editFormModel.value]
})
tableSaveOnFetchResponse(() => {
  emits('onTableSaveSuccess')
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
    emits('onTableDeleteSuccess')
    await tableListFetch()
    ElMessage.success('删除成功')
  } catch (error) {
    console.log(error)
  } finally {
    tableLoading.value = false
  }
}

const handleMultipleDelete = async (value: FormModel[]) => {
  try {
    tableLoading.value = true
    await tableDelete(props.api.delete, { id: value.map((item) => item.id) })
    emits('onTableDeleteSuccess')
    await tableListFetch()
    ElMessage.success('删除成功')
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
    emits('onTableExportSuccess')
    const exportDataSheet: FormModel[] = []
    if (exportData.value?.length) {
      exportData.value.forEach((item) => {
        const exportItem: FormModel = {}
        for (const key in item) {
          if (has(props.tableForm, key) && props.tableForm[key].table.show) {
            exportItem[props.tableForm[key].table.label as string] = item[key]
            if (has(props.tableForm[key].table, 'exportFormatter')) {
              //@ts-ignore
              exportItem[props.tableForm[key].table.label as string] = props.tableForm[
                key
              ].table.exportFormatter(item[key])
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

const handleExportTemplate = async () => {
  const data: FormModel = {}
  for (const key in props.tableForm) {
    if (props.tableForm[key].form.editFormShow) {
      if (props.tableForm[key].form.itemProps?.label) {
        data[props.tableForm[key].form.itemProps?.label as string] = ''
      } else {
        data[key] = ''
      }
    }
  }
  const templateData = []
  templateData.push(data)
  const worksheet = utils.json_to_sheet(templateData)
  const workbook = utils.book_new()
  utils.book_append_sheet(workbook, worksheet, 'Sheet1')
  writeFileXLSX(workbook, `导入模板.xlsx`)
}

const handleImport = async (options: UploadRequestOptions) => {
  const ab = await options.file.arrayBuffer()
  const wb = read(ab)
  const ws = wb.Sheets[wb.SheetNames[0]]
  const data = utils.sheet_to_json(ws)
  const importData = []
  for (const item of data as FormModel[]) {
    const dataItem: FormModel = {}
    for (const key in item) {
      for (const propsKey in props.tableForm) {
        if (key == props.tableForm[propsKey].form.itemProps?.label) {
          dataItem[propsKey] = item[key]
          if (has(props.tableForm[propsKey].form, 'importFormatter')) {
            //@ts-ignore
            dataItem[propsKey] = props.tableForm[propsKey].form.importFormatter(item[key])
          }
        }
      }
    }
    importData.push(dataItem)
  }
  const { execute } = tableSave(props.api.save, { list: importData })
  return execute(true).then(() => {
    ElMessage.success('导入成功')
    tableListFetch()
  })
}
</script>
<style lang="scss" scoped></style>
