/**
 * 验证码
 * @param {string} id 验证码id
 * @param {string} img 验证码图片svg
 */
export interface Code {
  img: string
  id: string
}

/**
 * 登录表单
 * @param {string} username 用户名
 * @param {string} password 密码
 * @param {string} code 验证码
 * @param {string} codeId 验证码id
 */
export interface LoginForm {
  username: string
  password: string
  code: string
  codeId: string
}

/**
 * token
 * @param {string} token token
 */
export interface Token {
  token: string
}
