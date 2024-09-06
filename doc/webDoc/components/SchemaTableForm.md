# 表单表格(SchemaTableForm)

`/web/src/components/schemaTableForm/SchemaTableForm.vue`该组件对上述的 [表单组件(SchemaForm)](/webDoc/components/SchemaForm) 和 [表格组件(SchemaTable)](/webDoc/components/SchemaTable) 进行了二次封装，除了这两个组件的基础功能外，还提供了增删改查、导入导出等功能，同时会根据用户权限控制按钮显示。

示例：foolon admin 中的 CRUD 页面均使用该组件。

## API

### Attributes

| 参数                      | 说明               | 类型                                                                                                                     | 默认值 | 必填 |
| ------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------ | ------ | ---- |
| v-model:search-form-model | 查询表单绑定值     | [`FormModel`](/webDoc/components/SchemaForm#formmodel)                                                                   |        | 是   |
| v-model:edit-form-model   | 编辑表单绑定值     | [`FormModel`](/webDoc/components/SchemaForm#formmodel)                                                                   |        | 是   |
| searchOnCreate            | 组件创建时执行查询 | `boolean`                                                                                                                | true   | 否   |
| showTableOperations       | 是否显示表格操作栏 | `boolean`                                                                                                                | true   | 否   |
| tableForm                 | 表格表单配置       | [`SchemaTableForm<T extends FormModel>`](#schematableform)                                                               |        | 是   |
| tableProps                | 表格props          | [`TableProps`](#tableprops)                                                                                              |        | 否   |
| searchFormProps           | 查询表单props      | 与[Element Plus 的 Form Attributes](https://element-plus.org/zh-CN/component/form.html#form-attributes) 的 Form API 一致 |        | 否   |
| editFormProps             | 编辑表单props      | 与[Element Plus 的 Form Attributes](https://element-plus.org/zh-CN/component/form.html#form-attributes) 的 Form API 一致 |        | 否   |
| api                       | 接口地址           | [Api](#apiurl)                                                                                                           |        | 是   |

### Events

| 名称                 | 说明                                       | 类型              |
| -------------------- | ------------------------------------------ | ----------------- |
| onTableListSuccess   | 获取分页数据成功后的回调                   | `() => void`      |
| onTableSaveSuccess   | 保存数据成功后的回调，新增、编辑、导入     | `() => void`      |
| onTableDeleteSuccess | 删除数据成功后的回调                       | `() => void`      |
| onTableExportSuccess | 导出数据成功后的回调                       | `() => void`      |
| onTableIdSuccess     | 查询详情成功后的回调，参数为接口返回的数据 | `(value) => void` |

### Expose

| 名称                 | 说明                                                                                                                                            | 类型                                     |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| handleSearch         | 分页查询                                                                                                                                        | `() => void`                             |
| handleReset          | 查询表单重置                                                                                                                                    | `() => void`                             |
| handleDialog         | 新增、查看、编辑弹窗                                                                                                                            | [`handleDialog`](#handledialog)          |
| handleExport         | 导出数据                                                                                                                                        | `() => void`                             |
| handleImport         | 导入数据，与 Element Plus 的 [Upload 上传 中 属性](https://element-plus.org/zh-CN/component/upload.html#%E5%B1%9E%E6%80%A7)的`http-request`一致 | `(options:UploadRequestOptions) => void` |
| handleExport         | 导出数据                                                                                                                                        | `() => void`                             |
| handleExportTemplate | 下载导入模板                                                                                                                                    | `() => void`                             |
| handleMultipleDelete | 多选删除，参数为选中的行数据                                                                                                                    | `(value: FormModel[]) => void`           |
| handleDelete         | 删除一条数据，参数为删除的行数据                                                                                                                | `(value: FormModel) => void`             |
| handleEdit           | 编辑数据                                                                                                                                        | `() => void`                             |

## 类型定义

`/web/src/components/schemaTableForm/types/index.d.ts`

### SchemaTableForm

根据数据库表实体的 key 配置查询、编辑、表格项目，每个 key 对应一个项目，可仅对需要的 key 进行配置，项目配置如下：

| 参数       | 说明         | 类型                        | 默认值 | 必填 |
| ---------- | ------------ | --------------------------- | ------ | ---- |
| table      | 表格参数     | [`Table`](#table)           |        | 否   |
| editForm   | 编辑表单属性 | [`EditForm`](#editform)     |        | 否   |
| searchForm | 查询表单属性 | [`SearchForm`](#searchform) |        | 否   |

### TableProps

| 参数        | 说明                                                                                                                                                   | 类型 | 默认值 | 必填 |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ---- | ------ | ---- |
| props       | 表格的props设置，与Element Plus 的 [Table API](https://element-plus.org/zh-CN/component/table.html#table-api) 一致，去除了`data`属性                   |      |        | 否   |
| actionProps | `操作`列的props设置，与Element Plus 的 [Table-column API](https://element-plus.org/zh-CN/component/table.html#table-column-api) 一致，去除了`prop`属性 |      |        | 否   |

### Table

继承了 [Element Plus 的 Table-column 属性](https://element-plus.org/zh-CN/component/table.html#table-column-%E5%B1%9E%E6%80%A7)，删除`prop`属性，并增加了以下属性：

| 参数            | 说明                                 | 类型                  | 默认值 | 必填 |
| --------------- | ------------------------------------ | --------------------- | ------ | ---- |
| exportFormatter | 导出数据格式化，传递参数为当前字段值 | `(value: any) => any` |        | 否   |

### EditForm

| 参数            | 说明                                                                                                                                                    | 类型                    | 默认值 | 必填 |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | ------ | ---- |
| rule            | 单挑表单校验规则，与 [Element Plus 的 FormItem Attributes](https://element-plus.org/zh-CN/component/form.html#formitem-attributes) 的 `rules` 一致      | `FormItemRule[]`        |        | 否   |
| props           | 表单项目 porps，与 [Element Plus 的 FormItem Attributes](https://element-plus.org/zh-CN/component/form.html#formitem-attributes) 一致，删除了`prop`属性 | [`EditForm`](#editform) |        | 否   |
| vIf             | 等同于v-if，控制表单项目是否显示，传递的参数为表单绑定值                                                                                                | `(model: T) => boolean` | -      | 否   |
| component       | 表单项目的组件，可参考 [Vue3 的渲染函数 h](https://cn.vuejs.org/guide/extras/render-function.html#basic-usage)                                          | `VNode`                 | -      | 否   |
| importFormatter | 导入数据格式化，传递参数为当前字段值                                                                                                                    | `(value: any) => any`   | -      | 否   |

### SearchForm

| 参数      | 说明                                                                                                                                                    | 类型                    | 默认值 | 必填 |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | ------ | ---- |
| rule      | 单挑表单校验规则，与 [Element Plus 的 FormItem Attributes](https://element-plus.org/zh-CN/component/form.html#formitem-attributes) 的 `rules` 一致      | `FormItemRule[]`        |        | 否   |
| props     | 表单项目 porps，与 [Element Plus 的 FormItem Attributes](https://element-plus.org/zh-CN/component/form.html#formitem-attributes) 一致，删除了`prop`属性 | [`EditForm`](#editform) |        | 否   |
| vIf       | 等同于v-if，控制表单项目是否显示，传递的参数为表单绑定值                                                                                                | `(model: T) => boolean` | -      | 否   |
| component | 表单项目的组件，可参考 [Vue3 的渲染函数 h](https://cn.vuejs.org/guide/extras/render-function.html#basic-usage)                                          | `VNode`                 | -      | 否   |

### ApiURL

| 参数   | 说明     | 类型     | 默认值 | 必填 |
| ------ | -------- | -------- | ------ | ---- |
| list   | 导出列表 | `string` |        | 是   |
| page   | 分页查询 | `string` |        | 是   |
| id     | 按id查询 | `string` |        | 是   |
| create | 新增     | `string` |        | 是   |
| update | 修改     | `string` |        | 是   |
| import | 导入     | `string` |        | 是   |
| delete | 删除     | `string` |        | 是   |

### handleDialog

```ts
type handleDialog = (title: '新增' | '编辑' | '查看', form: FormModel) => void
```
