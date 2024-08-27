# 表格(SchemaTable)

`/web/src/components/schemaTable/SchemaTable.vue`该组件对 Element Plus 的 [Table 表格](https://element-plus.org/zh-CN/component/table.html) 和 [Pagination 分页](https://element-plus.org/zh-CN/component/pagination.html) 进行了二次封装，提供了默认的表格布局、操作按钮、分页等功能，以及完全使用 TypeScript 编写的动态表格功能。

示例：`/web/src/views/demo/SchemaTableDemo.vue`

## API

### Attributes

| 参数    | 说明                                                                            | 类型                                               | 默认值 | 必填 |
| ------- | ------------------------------------------------------------------------------- | -------------------------------------------------- | ------ | ---- |
| v-model | 分页属性                                                                        | [`Pagination`](#pagination)                        |        | 是   |
| table   | 表格配置，T 为 [`FormModel`](/webDoc/components/SchemaForm#formmodel)类型的参数 | [`SchemaTable<T extends FormModel>`](#schematable) |        | 是   |

### Slots

| 参数    | 说明       | 类型                                        |
| ------- | ---------- | ------------------------------------------- |
| default | 表格操作列 | `{ row: any, column: any, $index: number }` |

## 类型声明

`/web/src/components/schemaTable/types/index.d.ts`

### Pagination

| 参数        | 说明     | 类型     | 默认值 | 必填 |
| ----------- | -------- | -------- | ------ | ---- |
| pageSize    | 页大小   | `number` |        | 是   |
| currentPage | 当前页码 | `number` |        | 是   |
| total       | 总条数   | `number` |        | 是   |

### SchemaTable

| 参数         | 说明                                                                                                                                                                     | 类型                                    | 默认值  | 必填 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------- | ------- | ---- |
| props        | 表格属性                                                                                                                                                                 | [`TableProps<T>`](#tableprops)          | -       | 是   |
| events       | 表格事件，与 Element Plus 的 [Table 事件](https://element-plus.org/zh-CN/component/table.html#table-%E5%B1%9E%E6%80%A7) 属性                                             |                                         | -       | 否   |
| columns      | 以表格数据的`key` ，作为表格各列的`key`， 值为去除`prop`属性的 Element Plus 的 [Table-column 属性](https://element-plus.org/zh-CN/component/table.html#table-column-api) |                                         |         | 否   |
| actionsProps | 表格操作列属性，与去除`prop`属性的 Element Plus 的 [Table-column 属性](https://element-plus.org/zh-CN/component/table.html#table-column-api)一致                         |                                         | -       | 否   |
| pagination   | 分页属性                                                                                                                                                                 |  [`PaginationProps`](#paginationprops)  | -       | 否   |

### TableProps

继承了 Element Plus 的 [Table 属性](https://element-plus.org/zh-CN/component/table.html#table-%E5%B1%9E%E6%80%A7)，删除了`data`属性，并添加了以下属性：

| 参数          | 说明                   | 类型      | 默认值 | 必填 |
| ------------- | ---------------------- | --------- | ------ | ---- |
| data          | 表数据，提供了类型提示 | `T[]`     | -      | 是   |
| loading       | 是否显示表格加载中     | `boolean` | -      | 否   |
| showSelection | 是否显示多选框         | `boolean` | -      | 否   |

### PaginationProps

| 参数   | 说明                                                                                                                                                                                                     | 类型 | 默认值 | 必填 |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | ------ | ---- |
| props  | Element Plus 的[ Pagination 分页属性](https://element-plus.org/zh-CN/component/pagination.html#%E5%B1%9E%E6%80%A7)，去除了`pageSize、currentPage、defaultPageSize、defaultCurrentPage、total、pageCount` |      | -      | 否   |
| events | Element Plus 的[ Pagination 分页事件](https://element-plus.org/zh-CN/component/pagination.html#%E4%BA%8B%E4%BB%B6)                                                                                       |      | -      | 否   |
