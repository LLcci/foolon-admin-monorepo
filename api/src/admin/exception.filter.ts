/*
https://docs.nestjs.com/exception-filters#exception-filters-1
*/

import { ResponseDto } from '@/common/class/response.dto'
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common'

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

    const message = exception instanceof HttpException ? exception.message : `${exception}`

    response.status(status).send(ResponseDto.fail(null, status, message))
  }
}
