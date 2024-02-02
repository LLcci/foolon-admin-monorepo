export const useComponents = () => {
  const glob = import.meta.glob('/src/views/**/*.vue')
  const components: any[] = []
  for (const key in glob) {
    components.push(key.split('/views/')[1].split('.vue')[0].split('/'))
  }
  const componentsTree: any[] = []
  getComponentsTree(componentsTree, components, undefined)
  return {
    componentsTree,
    components
  }
}

const getComponentsTree = (
  componentsTree: Record<string, any>[],
  list: any[][],
  temp?: Record<string, any>
) => {
  if (!componentsTree.length && !temp) {
    list?.forEach((item) => {
      const firstTree = {
        value: item[0],
        label: item[0],
        children: []
      }
      if (!componentsTree.find((component) => component.value == firstTree.value)) {
        componentsTree.push(firstTree)
        getComponentsTree(componentsTree, list, firstTree)
      }
    })
  } else {
    list?.forEach((item) => {
      for (const key in item) {
        const tree = {
          value: item[key],
          label: item[key],
          children: []
        }
        if (key == '0') {
          continue
        }
        if (temp?.value == item[Number(key) - 1]) {
          temp?.children.push(tree)
          if (Number(key) != item.length - 1) {
            getComponentsTree(componentsTree, list, tree)
          }
        }
      }
    })
  }
}
