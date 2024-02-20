export const permissions = {
  mounted(el: HTMLElement, binding: { value: string }) {
    // todo 获取用户权限
    const permission = [
      '/sys/menu/page',
      '/sys/menu/id',
      '/sys/menu/save',
      '/sys/menu/import',
      '/sys/menu/delete',
      '/sys/menu/list',
      '/sys/role/page',
      '/sys/role/list',
      '/sys/role/id',
      '/sys/role/save',
      '/sys/role/import',
      '/sys/role/delete'
    ]
    if (!permission.includes(binding.value)) {
      el.parentNode?.removeChild(el)
    }
  }
}
