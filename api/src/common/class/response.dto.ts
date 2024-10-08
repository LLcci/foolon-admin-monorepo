import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator'
import dayjs from 'dayjs'

export class ResponseDto<T> {
  constructor(
    data: T,
    code: number,
    message = 'success',
    success = true,
    timestamp = dayjs().unix()
  ) {
    this.data = data
    this.code = code
    this.message = message
    this.success = success
    this.timestamp = timestamp
  }
  data: T
  code: number
  message: string
  success: boolean
  readonly timestamp: number

  static success<T>(data: T, message = 'success'): ResponseDto<T> {
    return new ResponseDto<T>(data, 200, message, true)
  }
  static fail<T>(data: T, code: number, message = 'fail'): ResponseDto<T> {
    return new ResponseDto<T>(data, code, message, false)
  }
}

export class PageResultDto<T> {
  constructor(records: T[], total: number, currentPage = 1, pageSize = 10) {
    this.currentPage = currentPage
    this.pageSize = pageSize
    this.total = total
    this.records = records
  }
  @ApiProperty({
    description: '当前页码'
  })
  currentPage: number
  @ApiProperty({
    description: '每页条数'
  })
  pageSize: number
  @ApiProperty({
    description: '总条数'
  })
  total: number
  records: T[]
}

export class PageRequestDto {
  constructor(currentPage = 1, pageSize = 10) {
    this.currentPage = currentPage
    this.pageSize = pageSize
  }
  @ApiProperty({
    required: false,
    description: '当前页码',
    default: 1
  })
  @IsNotEmpty({ message: '当前页码不能为空' })
  @IsNumber({}, { message: '当前页码必须是数字' })
  @IsOptional()
  currentPage: number = 1

  @ApiProperty({
    required: false,
    description: '页大小',
    default: 10
  })
  @IsNotEmpty({ message: '当前页码不能为空' })
  @IsNumber({}, { message: '当前页码必须是数字' })
  @IsOptional()
  pageSize: number = 10
}
