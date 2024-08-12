# 权限配置

foolon admin 采用 RBAC 基于角色的权限控制，将权限分配给角色，再将角色分配给用户，实现权限控制。

启动项目并登录后，可在`系统管理`菜单栏下对权限、角色和用户进行管理。

## 权限管理

点击菜单栏`系统管理->菜单管理`，进入权限管理页面。

可在此页面对权限进行管理，如添加、编辑、删除权限。

权限类型包括一级菜单、子菜单和权限。其中首页为固定页面，不可通过权限管理进行修改。

::: tip 提示
`组件`为前端代码`/web/src/views`目录下的页面文件，如`/web/src/views/sys/SysMenu.vue`为菜单管理页面。

`权限`为接口地址，如`/admin/sys/menu/list`为菜单管理接口。
:::

## 角色管理

点击菜单栏`系统管理->角色管理`，进入角色管理页面。

可在此页面对角色进行管理，如添加、编辑、删除角色。

## 用户管理

点击菜单栏`系统管理->用户管理`，进入用户管理页面。

可在此页面对用户进行管理，如添加、编辑、删除用户。