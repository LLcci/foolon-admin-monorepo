/**
 * redis前缀
 */
export const REDIS_PREFIX = 'foolon:admin:'
/**
 * 用户id前缀
 */
export const REDIS_USERID_PREFIX = `${REDIS_PREFIX}userid:`
/**
 * token前缀
 */
export const REDIS_TOKEN_PREFIX = `${REDIS_PREFIX}token:`
/**
 * 验证码前缀
 */
export const REDIS_CODE_PREFIX = `${REDIS_PREFIX}code:`
/**
 * 路由前缀
 */
export const REDIS_ROUTE_PREFIX = `${REDIS_PREFIX}route`
/**
 * token过期时间(秒)
 */
export const REDIS_TOKEN_EX = 86400
/**
 * 登录验证码过期时间(秒)
 */
export const REDIS_CODE_EX = 60
