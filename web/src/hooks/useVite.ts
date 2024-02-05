export const useComponents = () => {
  const glob = import.meta.glob<Record<string, any>>('/src/views/**/*.vue')
  const components: string[] = []
  for (const key in glob) {
    if (!key.includes('login')) {
      components.push(key.split('/views')[1])
    }
  }
  return {
    components
  }
}
