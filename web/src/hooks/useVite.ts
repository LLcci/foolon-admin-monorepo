export const useComponents = () => {
  const glob = import.meta.glob('/src/views/**/*.vue')
  const components: any[] = []
  for (const key in glob) {
    components.push(key.split('/views/')[1].split('.vue')[0])
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
  list: string[],
  temp?: Record<string, any>
) => {
  if (!componentsTree.length && !temp) {
    list?.forEach((item) => {
      const firstTree = {
        value: item.split('/')[0],
        label: item.split('/')[0],
        children: []
      }
      if (!componentsTree.find((component) => component.value == firstTree.value)) {
        componentsTree.push(firstTree)
        getComponentsTree(componentsTree, list, firstTree)
      }
    })
  } else {
    list?.forEach((item) => {
      for (const key in item.split('/')) {
        const tree = {
          value: Number(key) == item.split('/').length - 1 ? item : item.split('/')[key],
          label: item.split('/')[key],
          children: []
        }
        if (key == '0') {
          continue
        }
        if (temp?.value == item.split('/')[Number(key) - 1]) {
          temp?.children.push(tree)
          if (Number(key) != item.split('/').length - 1) {
            getComponentsTree(componentsTree, list, tree)
          }
        }
      }
    })
  }
}
