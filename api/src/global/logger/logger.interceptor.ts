import { LoggerService } from '@/global/logger/logger.service'
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest()

    this.logger.log(
      `请求接口: ${req.method} ${req.url} data:${JSON.stringify(
        req.body
      )} query:${JSON.stringify(req.query)} params:${JSON.stringify(req.params)}`
    )
    return next.handle().pipe(
      tap(
        (data) =>
          this.logger.log(`响应结果: ${req.method} ${req.url} data:${JSON.stringify(data)}`),
        (err) => {
          this.logger.error(`响应错误: ${req.method} ${req.url} data:${JSON.stringify(err)}`)
        }
      )
    )
  }
}
