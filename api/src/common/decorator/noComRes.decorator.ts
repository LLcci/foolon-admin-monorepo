import { SetMetadata } from '@nestjs/common'
import { NO_COMMON_RESULT } from '../constants/result.constants'

/**
 * 使用该注解则不使用公共返回
 */
export const NoComRes = () => SetMetadata(NO_COMMON_RESULT, true)
