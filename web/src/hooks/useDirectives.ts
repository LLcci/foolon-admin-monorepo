import { useUser } from '@/stores/useUser'

export const permissions = {
  mounted(el: HTMLElement, binding: { value: string }) {
    if (!useUser().userPerms.includes(binding.value)) {
      el.parentNode?.removeChild(el)
    }
  }
}
