import { SetMetadata } from '@nestjs/common'
import { PERMISSION } from '../constants/permission.constants'

/**
 * 使用该注解则无需校验权限
 */
export const Permission = () => SetMetadata(PERMISSION, true)
