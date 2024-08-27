# 表单(SchemaForm)

`/web/src/components/schemaForm/SchemaForm.vue`该组件对 [Element Plus 的 Form 表单](https://element-plus.org/zh-CN/component/form.html) 进行了二次封装，提供了默认的表单布局、校验等功能，以及完全使用 TypeScript 编写的动态表单功能。

示例：`/web/src/views/demo/SchemaFormDemo.vue`

## API

### Attributes

| 参数    | 说明                             | 类型                           | 默认值 | 必填 |
| ------- | -------------------------------- | ------------------------------ | ------ | ---- |
| v-model | 表单绑定值                       | [`FormModel`](#formmodel)      | -      | 是   |
| form    | 表单配置，T 传递表单绑定值的类型 | [`SchemaForm<T>`](#schemaform) | -      | 是   |

### Events

| 名称         | 说明                                             | 类型                  |
| ------------ | ------------------------------------------------ | --------------------- |
| onValidateOk | 表单提交校验成功的回调，参数为校验后的表单绑定值 | `(formModel) => void` |

### Exposes

| 名称    | 说明                                                                                                                    | 类型 |
| ------- | ----------------------------------------------------------------------------------------------------------------------- | ---- |
| formRef | 表单的模板引用，与 [Element Plus 的 Form Exposes](https://element-plus.org/zh-CN/component/form.html#form-exposes) 一致 |      |

### Slots

| 参数    | 说明                     | 类型 |
| ------- | ------------------------ | ---- |
| default | 操作按钮栏，`查询、提交` |      |

## 类型声明

### FormModel

`/web/src/types/FormModel.d.ts`

```ts
type FormModel = Record<string, any>

let fromModel = ref<FormModel>({
  name: '张三',
  age: 18
})
```

### SchemaForm

`/web/src/components/schemaForm/types/index.d.ts`

| 参数      | 说明                                                                  | 类型                         | 默认值 | 必填 |
| --------- | --------------------------------------------------------------------- | ---------------------------- | ------ | ---- |
| props     | 表单属性，T 传递表单绑定值的类型                                      | [`FormProps<T>`](#formprops) | -      | 是   |
| formItems | 依据表单绑定值的 key 配置表单项目及对应的组件，T 传递表单绑定值的类型 | [`FormItems<T>`](#formitems) | -      | 是   |

### FormProps

继承了 Element Plus 的 [Form Attributes](https://element-plus.org/zh-CN/component/form.html#form-attributes)，移除了 `model` 和 `rules` 属性，并添加以下属性。

| 参数           | 说明                                         | 类型           | 默认值 | 必填 |
| -------------- | -------------------------------------------- | -------------- | ------ | ---- |
| rules          | Element Plus 表单校验规则，添加了 key 值提示 | `FormRules<T>` | -      | 否   |
| showButtonSlot | 是否显示`提交、重置`按钮                     | `boolean`      | false  | 否   |

### FormItems

根据表单绑定值的 key 配置表单项目及对应的组件，每个 key 对应一个表单项，可仅对需要的 key 进行配置，表单项配置如下：

`/web/src/components/schemaForm/types/index.d.ts`

| 参数      | 说明                                                                                                                                                    | 类型                    | 默认值 | 必填 |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | ------ | ---- |
| props     | 表单项目 porps，与 [Element Plus 的 FormItem Attributes](https://element-plus.org/zh-CN/component/form.html#formitem-attributes) 一致，删除了`prop`属性 |                         | -      | 否   |
| component | 表单项目的组件，可参考 [Vue3 的渲染函数 h](https://cn.vuejs.org/guide/extras/render-function.html#basic-usage)                                          | `VNode`                 | -      | 是   |
| vIf       | 等同于v-if，控制表单项目是否显示，传递的参数为表单绑定值                                                                                                | `(model: T) => boolean` | -      | 否   |
