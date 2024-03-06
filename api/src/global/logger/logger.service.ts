import { Logger, createLogger, format, transports } from 'winston'
import 'winston-daily-rotate-file'
import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common'
import { basename } from 'path'

@Injectable()
export class LoggerService implements NestLoggerService {
  private logger: Logger

  constructor() {
    this.logger = createLogger({
      // winston 格式定义
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.ms(),
        format.colorize({ all: true }),
        format.printf((info) => {
          // 定义文件输出内容
          return `${info.timestamp} [foolon-admin] ${info.meta.file} ${info.message} ${info.ms}`
        })
      ),
      // 生成文件
      // winston 文档中使用的方法为 new transports.File()
      // 因为加入日志归档等相关功能，所以使用transports.DailyRotateFile()方法来实现
      transports: [
        // 打印到控制台，生产可注释关闭该功能
        new transports.Console(),
        // 保存到文件
        new transports.DailyRotateFile({
          json: true,
          // 日志文件文件夹，建议使用path.join()方式来处理，或者process.cwd()来设置，此处仅作示范
          dirname: 'logs',
          // 日志文件名 %DATE% 会自动设置为当前日期
          filename: 'floolon.%DATE%.info.log',
          // 日期格式
          datePattern: 'YYYY-MM-DD',
          // 压缩文档，用于定义是否对存档的日志文件进行 gzip 压缩 默认值 false
          zippedArchive: true,
          // 文件最大大小，可以是bytes、kb、mb、gb
          maxSize: '5m',
          // 最大文件数，可以是文件数也可以是天数，天数加单位"d"，
          maxFiles: '1d',
          // 格式定义，同winston
          format: format.combine(
            format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss'
            }),
            format.json(),
            format.colorize({ all: false }),
            format.printf((info) => {
              // 定义文件输出内容
              return `${info.timestamp} [foolon-admin] ${info.meta.file} ${info.message} ${info.ms}`
            })
          ),
          // 日志等级，不设置所有日志将在同一个文件
          level: 'info'
        }),
        // 同上述方法，区分error日志和info日志，保存在不同文件，方便问题排查
        new transports.DailyRotateFile({
          json: true,
          dirname: 'logs',
          filename: 'floolon-%DATE%.error.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '5m',
          maxFiles: '1d',
          format: format.combine(
            format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss'
            }),
            format.json(),
            format.colorize({ all: false }),
            format.printf((info) => {
              // 定义文件输出内容
              return `${info.timestamp} [foolon-admin] ${info.meta.file} ${info.message} ${info.ms}`
            })
          ),
          level: 'error'
        })
      ]
    })
  }

  // 错误日志记录
  error(message: string, stack?: string): Logger {
    return this.logger.error({
      message,
      meta: {
        file: `${stack}`
      }
    })
  }
  // 警告日志记录
  warn(message: string): Logger {
    const err = new Error()
    const stack = err.stack.split('\n')
    const line = stack[2]
    const fileInfo = line.trim().match(/at (.*) \((.*):(\d+):(\d+)\)/)
    return this.logger.warn({
      message,
      meta: {
        file: `${basename(fileInfo[2])} ${fileInfo[1]} ${fileInfo[3]}:${fileInfo[4]}`
      }
    })
  }
  // debug日志记录
  debug(message: string): Logger {
    const err = new Error()
    const stack = err.stack.split('\n')
    const line = stack[2]
    const fileInfo = line.trim().match(/at (.*) \((.*):(\d+):(\d+)\)/)
    return this.logger.debug({
      message,
      meta: {
        file: `${basename(fileInfo[2])} ${fileInfo[1]} ${fileInfo[3]}:${fileInfo[4]}`
      }
    })
  }
  // 基本日志记录
  info(message: string): Logger {
    const err = new Error()
    const stack = err.stack.split('\n')
    const line = stack[2]
    const fileInfo = line.trim().match(/at (.*) \((.*):(\d+):(\d+)\)/)
    return this.logger.info({
      message,
      meta: {
        file: `${basename(fileInfo[2])} ${fileInfo[1]} ${fileInfo[3]}:${fileInfo[4]}`
      }
    })
  }

  log(message: string): Logger {
    const err = new Error()
    const stack = err.stack.split('\n')
    const line = stack[2]
    const fileInfo = line.trim().match(/at (.*) \((.*):(\d+):(\d+)\)/)
    return this.logger.log({
      level: 'info',
      message,
      meta: {
        file: `${basename(fileInfo[2])} ${fileInfo[1]} ${fileInfo[3]}:${fileInfo[4]}`
      }
    })
  }
}
