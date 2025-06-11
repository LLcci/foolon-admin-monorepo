<template>
  <div class="flex items-center justify-center">
    <el-steps class="w-90%" :active="active" finish-status="success" align-center>
      <el-step title="基础信息" />
      <el-step title="表信息" />
      <el-step title="生成信息" />
    </el-steps>
  </div>
  <!-- 基础信息表单 -->
  <el-form
    v-if="active == 0"
    class="mt"
    :model="basicForm"
    :rules="basicFormRules"
    label-width="auto"
    ref="basicFormRef"
  >
    <el-form-item label="实体名称" prop="name">
      <el-input placeholder="请输入实体名称，小驼峰，例：sysUser" v-model="basicForm.name" />
    </el-form-item>
    <el-form-item label="表名称" prop="tableName">
      <el-select
        filterable
        :loading="tableListLoading"
        v-model="basicForm.tableName"
        placeholder="请选择表"
        @change="tableChangeHandle"
      >
        <el-option
          v-for="item in tableList"
          :key="item.name"
          :label="item.name"
          :value="item.name"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="描述" prop="description">
      <el-input placeholder="请输入描述" v-model="basicForm.description" />
    </el-form-item>
    <div class="flex items-center justify-center">
      <el-button :loading="tableListLoading" type="primary" @click="basicSubmitForm">
        下一步
      </el-button>
    </div>
  </el-form>
  <!-- 表信息表单 -->
  <div class="mt" v-if="active == 1">
    <el-table :data="tableData">
      <el-table-column prop="name" label="字段名称" />
      <el-table-column prop="type" label="字段类型" />
      <el-table-column prop="description" label="描述" />
      <el-table-column prop="isSave" label="保存">
        <template #default="scope">
          <el-switch v-if="!notSaveFiledList.includes(scope.row.name)" v-model="scope.row.isSave" />
          <div v-else></div>
        </template>
      </el-table-column>
      <el-table-column prop="isQuery" label="查询">
        <template #default="scope">
          <el-switch v-model="scope.row.isQuery" />
        </template>
      </el-table-column>
      <el-table-column prop="isList" label="列表">
        <template #default="scope">
          <el-switch v-model="scope.row.isList" />
        </template>
      </el-table-column>
      <el-table-column prop="isRequired" label="必填">
        <template #default="scope">
          <el-switch
            v-if="!notSaveFiledList.includes(scope.row.name)"
            v-model="scope.row.isRequired"
          />
          <div v-else></div>
        </template>
      </el-table-column>
      <el-table-column prop="queryType" label="查询类型">
        <template #default="scope">
          <el-select v-model="scope.row.queryType">
            <el-option v-for="item in queryTypeList" :key="item" :label="item" :value="item" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="component" label="组件">
        <template #default="scope">
          <el-select v-model="scope.row.component">
            <el-option v-for="item in componentTypeList" :key="item" :label="item" :value="item" />
          </el-select>
        </template>
      </el-table-column>
    </el-table>
    <div class="mt flex items-center justify-center">
      <el-button @click="active = 0">上一步</el-button>
      <el-button type="primary" @click="active = 2">下一步</el-button>
    </div>
  </div>
  <!-- 生成信息表单 -->
  <el-form
    v-if="active == 2"
    class="mt"
    :model="genForm"
    :rules="genFormRules"
    label-width="auto"
    ref="genFormRef"
  >
    <el-form-item label="API生成路径" prop="apiGenPath">
      <el-input
        placeholder="请输入API生成路径，例：/src/admin/system/test"
        v-model="genForm.apiGenPath"
      />
    </el-form-item>
    <el-form-item label="WEB生成路径" prop="webGenPath">
      <el-input
        placeholder="请输入WEB生成路径，例：/src/admin/system/test"
        v-model="genForm.webGenPath"
      />
    </el-form-item>
    <div class="flex items-center justify-center">
      <el-button @click="active = 1" :loading="genFetchLoading">上一步</el-button>
      <el-button :loading="genFetchLoading" type="primary" @click="genSubmitForm">
        生成代码
      </el-button>
    </div>
  </el-form>
</template>
<script setup lang="ts">
import { useFetch } from '@/hooks/useFetch'
import type { paths } from '@/types/Schema'
import { type FormRules, ElStep, ElSteps, type FormInstance, ElMessage } from 'element-plus'
import { ref } from 'vue'

const { data: tableList, isFetching: tableListLoading } = useFetch<
  paths['/admin/sys/code-gen/table-list']['get']['responses']['200']['content']['application/json']
>('/admin/sys/code-gen/table-list', { initialData: [] }).get()

const active = ref(0)

type BasicFormType = Pick<
  paths['/admin/sys/code-gen/generate']['post']['requestBody']['content']['application/json'],
  'name' | 'tableName' | 'description'
>

const basicFormRef = ref<FormInstance>()

const basicForm = ref<BasicFormType>({
  name: '',
  tableName: '',
  description: ''
})

const basicFormRules = ref<FormRules<BasicFormType>>({
  name: [{ required: true, message: '请输入实体名称' }],
  tableName: [{ required: true, message: '请输入表名称' }],
  description: [{ required: true, message: '请输入描述' }]
})

const basicSubmitForm = async () => {
  try {
    await basicFormRef.value?.validate()
    console.log('basicForm', basicForm.value)
    active.value = 1
  } catch (error) {
    console.error(error)
  }
}

enum QueryTypeEnum {
  '=' = '=',
  '!=' = '!=',
  '>' = '>',
  '<' = '<',
  '>=' = '>=',
  '<=' = '<=',
  'like' = 'like'
}

const queryTypeList = ref(Object.values(QueryTypeEnum))

enum ComponentTypeEnum {
  'input' = 'input',
  'input-number' = 'input-number',
  'textarea' = 'textarea',
  'select' = 'select',
  'date' = 'date'
}

const componentTypeList = ref(Object.values(ComponentTypeEnum))

const notSaveFiledList = ref(['id', 'create_time', 'update_time', 'createUserId', 'updateUserId'])

const hiddenFiledList = ['delete_time', 'status']

const tableChangeHandle = (value: string) => {
  tableData.value = []
  if (!value) {
    return
  }
  const thisTable = tableList.value?.find((item) => item.name === value)
  if (!thisTable) {
    return
  }
  for (const item of thisTable.columns) {
    if (hiddenFiledList.includes(item.name)) {
      continue
    }
    tableData.value.push({
      name: item.name,
      type: item.type,
      description: item.comment,
      isSave: false,
      isQuery: false,
      isList: false,
      isRequired: false,
      queryType: QueryTypeEnum['='],
      component: ComponentTypeEnum['input']
    })
  }
}

type TableDataType = Pick<
  paths['/admin/sys/code-gen/generate']['post']['requestBody']['content']['application/json'],
  'fields'
>['fields']

const tableData = ref<TableDataType>([])

type GenFormType = Pick<
  paths['/admin/sys/code-gen/generate']['post']['requestBody']['content']['application/json'],
  'apiGenPath' | 'webGenPath'
>

const genFormRef = ref<FormInstance>()

const genForm = ref<GenFormType>({
  apiGenPath: '',
  webGenPath: ''
})

const genFormRules = ref<FormRules<GenFormType>>({
  apiGenPath: [{ required: true, message: '请输入API生成路径，例：/src/admin/system/test' }],
  webGenPath: [{ required: true, message: '请输入WEB生成路径，例：/src/admin/system/test' }]
})

let genFetchForm: paths['/admin/sys/code-gen/generate']['post']['requestBody']['content']['application/json'] =
  {
    tableName: '',
    name: '',
    description: '',
    fields: [],
    apiGenPath: '',
    webGenPath: ''
  }

const genFetchLoading = ref(false)

const genSubmitForm = async () => {
  try {
    genFetchLoading.value = true
    await genFormRef.value?.validate()
    console.log('basicForm', basicForm.value)
    console.log('tableData', tableData.value)
    console.log('genForm', genForm.value)
    genFetchForm = { ...basicForm.value, ...genForm.value, fields: tableData.value }
    console.log('🚀 ~ genSubmitForm ~ genFetchForm:', genFetchForm)
    await useFetch('/admin/sys/code-gen/generate', { immediate: false })
      .post(genFetchForm)
      .execute(true)
    ElMessage.success('生成成功')
  } catch (error) {
    console.error(error)
  } finally {
    genFetchLoading.value = false
  }
}
</script>
<style scoped></style>
