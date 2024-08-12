# 路由

foolon admin 使用 [Vue Router](https://router.vuejs.org/zh/) 实现路由功能，路由配置文件在 `/web/src/router/index.ts` 中。

## 静态路由

静态路由是页面在初始化时就加载的，比如登录页面，首页等，通过 `routes` 属性配置。

具体配置参考 [Vue Router](https://router.vuejs.org/zh/guide/)。

## 动态路由

动态路由是在获取用户信息后，根据用户的权限配置动态加载的。

具体可参考 [Vue Router 动态路由](https://router.vuejs.org/zh/guide/advanced/dynamic-routing.html)。

用户的权限配置可参考 [权限配置](/quickStart/permission.md)。
