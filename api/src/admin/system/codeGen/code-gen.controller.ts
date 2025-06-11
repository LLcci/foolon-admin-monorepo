import { BadRequestException, Body, Controller, Get, Post, Query } from '@nestjs/common'
import { ApiHeader, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { CodeGenService } from './code-gen.service'
import { GenApiDto, TableDto } from './code-gen.dto'

@ApiTags('代码生成')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer token',
  example: 'Bearer token'
})
@Controller('code-gen')
export class CodeGenController {
  constructor(private readonly codeGenService: CodeGenService) {}

  @ApiOperation({
    summary: '获取数据库表列表'
  })
  @ApiOkResponse({
    type: () => TableDto,
    isArray: true
  })
  @Get('table-list')
  async getTableList() {
    return await this.codeGenService.getTableList()
  }

  @ApiOperation({
    summary: '获取数据库表详情'
  })
  @ApiOkResponse({
    type: () => TableDto
  })
  @Get('table-detail')
  async getTableDetail(@Query('name') name: string) {
    return await this.codeGenService.getTableDetail(name)
  }

  @ApiOperation({
    summary: '代码生成'
  })
  @ApiOkResponse({
    type: () => String
  })
  @Post('generate')
  async generate(@Body() genApiDto: GenApiDto) {
    if (process.env.NODE_ENV !== 'development') {
      throw new BadRequestException('非开发环境，不允许生成代码')
    }
    await this.codeGenService.getTableDetail(genApiDto.tableName)
    return await this.codeGenService.generate(genApiDto)
  }
}
