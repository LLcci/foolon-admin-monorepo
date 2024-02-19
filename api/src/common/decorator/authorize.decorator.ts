import { SetMetadata } from '@nestjs/common';
import { AUTHORIZE } from '@/common/constants/token.constants';

/**
 * 开放授权Api，使用该注解则无需校验Token及权限
 */
export const Authorize = () => SetMetadata(AUTHORIZE, true);
