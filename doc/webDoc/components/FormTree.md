# 数选择器(FormTree)

`/web/src/components/formTree/FormTree.vue`该组件对 [Element Plus 的 Tree 树形控件](https://element-plus.org/zh-CN/component/tree.html) 进行了二次封装，提供了可与 [Element Plus 的 Form 组件](https://element-plus.org/zh-CN/component/form.html) 配合使用的数选择器功能。

## API

### Attributes

完全继承 [Element Plus 的 Tree 树形控件](https://element-plus.org/zh-CN/component/tree.html#props) 的 props。

| 参数    | 说明   | 类型        | 默认值 | 必填 |
| ------- | ------ | ----------- | ------ | ---- |
| v-model | 绑定值 | `TreeKey[]` | -      | 是   |
