import type { paths } from '@/types/Schema'

export const useMenuTree = (
  list:
    | paths['/admin/sys/menu/list']['post']['responses']['200']['content']['application/json']
    | null
) => {
  const menuTree: any[] = []
  getMenuTree(menuTree, list)
  return menuTree
}

const getMenuTree = (
  menuTree: Record<string, any>[],
  list:
    | paths['/admin/sys/menu/list']['post']['responses']['200']['content']['application/json']
    | null,
  temp?: Record<string, any>
) => {
  list?.forEach((item) => {
    const tree: Record<string, any> = {
      label: item.name,
      value: item.id,
      children: []
    }
    const temPid = item.parentId
    if (!temp && !item.parentId) {
      menuTree.push(tree)
      if (list.filter((i) => i.parentId === item.id).length) {
        getMenuTree(menuTree, list, tree)
      }
    } else if (temp && item.parentId && temPid == temp.value) {
      temp.children.push(tree)
      if (list.filter((i) => i.parentId === item.id).length) {
        getMenuTree(menuTree, list, tree)
      }
    }
  })
}
