import { useFetch } from '@/fetch/useFetch'
import type { Code, LoginForm, Token } from '../types'

/**
 * 获取验证码
 * @returns img: 图片svg; id: 验证码ID
 */
export function useCode() {
  return useFetch<Code>('/sys/login/code', { immediate: false }).get()
}

export function useLogin(data: LoginForm) {
  return useFetch<Token>('/sys/login', { immediate: false }).post(data)
}
