# 自定义组件

## 布局组件

`/web/src/components/layout/MainLayout.vue`该组件提供了与 [Vue Router](https://router.vuejs.org/zh/) 相结合的整体布局功能。

具体可参考 [Vue Router 的嵌套路由](https://router.vuejs.org/zh/guide/essentials/nested-routes.html)。

## 图片上传表单组件

`/web/src/components/formImgUpload/FormImgUpload.vue`该组件对 [Element Plus 的 Upload 上传组件](https://element-plus.org/zh-CN/component/upload.html) 进行了二次封装，提供了可与 [Element Plus 的 Form 组件](https://element-plus.org/zh-CN/component/form.html) 配合使用的图片上传功能。

## 数选择器表单组件

`/web/src/components/formTree/FormTree.vue`该组件对 [Element Plus 的 Tree 树形控件](https://element-plus.org/zh-CN/component/tree.html) 进行了二次封装，提供了可与 [Element Plus 的 Form 组件](https://element-plus.org/zh-CN/component/form.html) 配合使用的数选择器功能。

## 图标选择器表单组件

`/web/src/components/iconSelect/IconSelect.vue`该组件对 [Element Plus 的 Icon 图标](https://element-plus.org/zh-CN/component/icon.html) 进行了二次封装，提供了可与 [Element Plus 的 Form 组件](https://element-plus.org/zh-CN/component/form.html) 配合使用的图标选择功能。

## 表单组件

`/web/src/components/schemaForm/SchemaForm.vue`该组件对 [Element Plus 的 Form 表单](https://element-plus.org/zh-CN/component/form.html) 进行了二次封装，提供了默认的表单布局、校验等功能，以及完全使用 TypeScript 编写的动态表单功能。

## 表格组件

`/web/src/components/schemaTable/SchemaTable.vue`该组件对 Element Plus 的 [Table 表格](https://element-plus.org/zh-CN/component/table.html) 和 [Pagination 分页](https://element-plus.org/zh-CN/component/pagination.html) 进行了二次封装，提供了默认的表格布局、操作按钮、分页等功能，以及完全使用 TypeScript 编写的动态表格功能。

## 表单表格组件

`/web/src/components/schemaTableForm/SchemaTableForm.vue`该组件对上述的 [表单组件](/webDoc/component#表单组件) 和 [表格组件](/webDoc/component#表格组件) 进行了二次封装，除了这两个组件的基础功能外，还提供了增删改查、导入导出等功能。

## 菜单数组件

`/web/src/components/userMenuTree/UserMenuTree.vue`该组件对 Element Plus 的 [Menu 菜单](https://element-plus.org/zh-CN/component/menu.html) 内的 [SubMenu](https://element-plus.org/zh-CN/component/menu.html#submenu-api) 和 [Menu-Item](https://element-plus.org/zh-CN/component/menu.html#menu-item-api) 进行了二次封装，提供了使用 TypeScript 编写的无限级菜单功能。
