# 图片上传(FormImgUpload)

`/web/src/components/formImgUpload/FormImgUpload.vue`该组件对 [Element Plus 的 Upload 上传组件](https://element-plus.org/zh-CN/component/upload.html) 进行了二次封装，提供了可与 [Element Plus 的 Form 组件](https://element-plus.org/zh-CN/component/form.html) 配合使用的图片上传功能。

## API

### Attributes

| 参数        | 说明                                                                                                                        | 类型     | 默认值 | 必填 |
| ----------- | --------------------------------------------------------------------------------------------------------------------------- | -------- | ------ | ---- |
| uploadProps | [Element Plus 的 Upload 上传组件 的 Attributes](https://element-plus.org/zh-CN/component/upload.html#%E5%B1%9E%E6%80%A7) 。 |          |        | 否   |
| v-model     | 绑定值                                                                                                                      | `string` |        | 是   |
