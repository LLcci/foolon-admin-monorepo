# 递归菜单数(UserMenuTree)

`/web/src/components/userMenuTree/UserMenuTree.vue`该组件对 Element Plus 的 [Menu 菜单](https://element-plus.org/zh-CN/component/menu.html) 内的 [SubMenu](https://element-plus.org/zh-CN/component/menu.html#submenu-api) 和 [Menu-Item](https://element-plus.org/zh-CN/component/menu.html#menu-item-api) 进行了二次封装，提供了使用 TypeScript 编写的无限级菜单功能。

## API

### Attributes

| 参数         | 说明       | 类型                                    | 默认值 | 必填 |
| ------------ | ---------- | --------------------------------------- | ------ | ---- |
| userMenuTree | 菜单数聊表 | [`UserMenuTreeType`](#usermenutreetype) |        | 是   |

## 类型定义

### UserMenuTreeType

| 参数     | 说明   | 类型                 | 默认值 | 必填 |
| -------- | ------ | -------------------- | ------ | ---- |
| id       |        | `string`             |        | 是   |
| index    |        | `string`             |        | 否   |
| name     | 名称   | `string`             |        | 是   |
| icon     | 图标   | `string`             |        | 否   |
| children | 子菜单 | `UserMenuTreeType[]` |        | 否   |
