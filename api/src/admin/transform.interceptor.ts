/*
https://docs.nestjs.com/interceptors#interceptors
*/

import { ResponseDto } from '@/common/class/response.dto'
import { NO_COMMON_RESULT } from '@/common/constants/result.constants'
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (this.reflector.get(NO_COMMON_RESULT, context.getClass())) {
      return next.handle().pipe(map((data) => data))
    }
    if (this.reflector.get(NO_COMMON_RESULT, context.getHandler())) {
      return next.handle().pipe(map((data) => data))
    }
    return next.handle().pipe(map((data) => ResponseDto.success(data)))
  }
}
