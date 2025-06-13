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
 * 路由前缀
 */
export const REDIS_ROUTE_PREFIX = `${REDIS_PREFIX}route`
/**
 * token过期时间(秒)
 */
export const REDIS_TOKEN_EX = 86400
/**
 * 用户权限前缀
 */
export const REDIS_USER_PERMISSION_PREFIX = `${REDIS_PREFIX}permission:`
/**
 * 字典前缀
 */
export const REDIS_DICT_PREFIX = `${REDIS_PREFIX}dict:`
/**
 * 全部字典code
 */
export const REDIS_DICT_ALL_CODE = `${REDIS_PREFIX}dict:all:code`
