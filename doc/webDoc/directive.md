# 自定义指令

具体可参考 [Vue 自定义指令](https://cn.vuejs.org/guide/reusability/custom-directives.html)。

## 权限校验

`/web/src/hooks/useDirectives.ts` 内的 `permissions` 对象，在元素上添加 `v-permissions="xxx"` 即可。

若缺少该权限，则该元素会隐藏。

```vue
<el-button
  type="success"
  v-permissions="props.api.id"
  text
  size="default"
  @click="handleDialog('查看', scope.row)"
>查看</el-button>
```
