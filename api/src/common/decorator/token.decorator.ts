import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import extractTokenFromHeader from '../utils/extractTokenFromHeader'

export const Token = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()
  const token = extractTokenFromHeader(request.headers.authorization)
  return token
})
