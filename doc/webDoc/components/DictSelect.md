# 字典选择器(DictSelect)

`/web/src/components/dictSelect/DictSelect.vue`根据`系统管理-字典管理`创建的字典数据的code，创建一个选择器。

## API

### Attributes

| 参数         | 说明                                                                                                                                 | 类型      | 默认值  | 是否必填 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------ | --------- | ------- | -------- |
| code         | 字典编码                                                                                                                             | `string`  | -       | 是       |
| v-model      | 绑定值                                                                                                                               | `string`  | -       | 是       |
| setDefault   | 全部节点数组                                                                                                                         | `boolean` | `false` | 否       |
| selectProps  | 与 [Element Plus 的 Select 选择器](https://element-plus.org/zh-CN/component/select.html#select-attributes) 的 Select Attributes 一致 |           | -       | 否       |
| selectEvents | 与 [Element Plus 的 Select 选择器](https://element-plus.org/zh-CN/component/select.html#select-events) 的 Select Events 一致         |           | -       | 否       |

## useDictSchema

`/web/src/hooks/useDict.ts`提供了根据字典数据生成适用于[`表单表格(SchemaTableForm)`](/webDoc/components/SchemaTableForm)的`tableForm`配置项以及根据`code`获取字典数据的方法。

### useDictSchema

生成适用于[`表单表格(SchemaTableForm)`](/webDoc/components/SchemaTableForm)的`tableForm`配置项。

```ts
type useDictSchema = (
  code: string,
  editFormSelectPorps?: Record<string, any>,
  searchFormSelectPorps?: Record<string, any>,
  tableData?: Table
) => Promise<
  | {
      table: Table
      editForm: EditForm
      searchForm: SearchForm
    }
  | undefined
>
```

### useDictList

根据`code`获取字典数据。
