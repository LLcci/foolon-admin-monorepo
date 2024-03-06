/*
https://docs.nestjs.com/interceptors#interceptors
*/

import { ResponseDto } from '@/common/class/response.dto'
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => ResponseDto.success(data)))
  }
}
