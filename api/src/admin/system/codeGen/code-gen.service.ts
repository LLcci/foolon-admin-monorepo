import { BadRequestException, Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { GenApiDto, QueryTypeEnum, TableDto } from './code-gen.dto'
import { compile } from 'handlebars'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

@Injectable()
export class CodeGenService {
  constructor(private dataSource: DataSource) {}

  async getTableList() {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    const tableList = await queryRunner.getTables()
    await queryRunner.release()
    const tableListRes: TableDto[] = []
    for (const table of tableList) {
      if (table.database === process.env.DB_DATABASE) {
        tableListRes.push({
          name: table.name,
          columns: table.columns.map((item) => {
            return {
              name: item.name,
              type: item.type,
              comment: item.comment
            }
          })
        })
      }
    }
    return tableListRes
  }

  async getTableDetail(name: string): Promise<TableDto> {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    const table = await queryRunner.getTable(name)
    await queryRunner.release()
    if (!table) {
      throw new BadRequestException('表不存在')
    }
    return {
      name: table.name,
      columns: table.columns.map((item) => {
        return {
          name: item.name,
          type: item.type,
          comment: item.comment
        }
      })
    }
  }

  async generate(genApiDto: GenApiDto) {
    // 大驼峰名称
    const capitalName = genApiDto.name.charAt(0).toUpperCase() + genApiDto.name.slice(1)

    // controller代码生成
    const controllerTemplate = readFileSync(
      join(process.cwd(), '/template/api/tem.controller.ts.hbs'),
      'utf-8'
    )
    const controllerTemCompile = compile(controllerTemplate)
    const controllerTemCompileRes = controllerTemCompile({
      name: genApiDto.name,
      capitalName,
      description: genApiDto.description
    })
    writeFileSync(
      join(process.cwd(), genApiDto.apiGenPath, `${genApiDto.name}.controller.ts`),
      controllerTemCompileRes,
      'utf-8'
    )

    /**
     * 列表显示字段
     */
    let selectFields = ''
    /**
     * 查询条件字段
     */
    let queryFields = ''
    /**
     * 查询条件字段Dto类型
     */
    const listDtoFields: { apiProperty: string; validator?: string; name: string; type: string }[] =
      []
    /**
     * 保存字段Dto类型
     */
    const saveDtoFields: {
      apiProperty: string
      validator?: string
      name: string
      type: string
      required: boolean
    }[] = []
    /**
     * 详情显示字段
     */
    let detailFields = ''
    for (const field of genApiDto.fields) {
      // 将下划线链接转为小驼峰
      const camelCaseName = field.name.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
      if (field.isList) {
        selectFields += `'${camelCaseName}',`
      }
      if (field.isQuery) {
        switch (field.queryType) {
          case QueryTypeEnum['=']:
            queryFields += `${camelCaseName}: ${genApiDto.name}PageListDto.${camelCaseName} ?? undefined,`
            break
          case QueryTypeEnum['!=']:
            queryFields += `${camelCaseName}: ${genApiDto.name}PageListDto.${camelCaseName} ? Not(${genApiDto.name}PageListDto.${camelCaseName}) : undefined,`
            break
          case QueryTypeEnum['>']:
            queryFields += `${camelCaseName}: ${genApiDto.name}PageListDto.${camelCaseName} ? MoreThan(${genApiDto.name}PageListDto.${camelCaseName}) : undefined,`
            break
          case QueryTypeEnum['<']:
            queryFields += `${camelCaseName}: ${genApiDto.name}PageListDto.${camelCaseName} ? LessThan(${genApiDto.name}PageListDto.${camelCaseName}) : undefined,`
            break
          case QueryTypeEnum['>=']:
            queryFields += `${camelCaseName}: ${genApiDto.name}PageListDto.${camelCaseName} ? MoreThanOrEqual(${genApiDto.name}PageListDto.${camelCaseName}) : undefined,`
            break
          case QueryTypeEnum['<=']:
            queryFields += `${camelCaseName}: ${genApiDto.name}PageListDto.${camelCaseName} ? LessThanOrEqual(${genApiDto.name}PageListDto.${camelCaseName}) : undefined,`
            break
          case QueryTypeEnum['like']:
            queryFields += `${camelCaseName}: ${genApiDto.name}PageListDto.${camelCaseName} ? Like(${genApiDto.name}PageListDto.${camelCaseName}) : undefined,`
            break
          default:
            break
        }
        const apiProperty = `@ApiProperty({ description: '${field.description}', required: false })`
        const type = this.mapDbTypeToTsType(field.type)
        const capitalType = type.charAt(0).toUpperCase() + type.slice(1)
        let validator = `@Is${capitalType}({ message: '${field.description}，格式错误' })`
        if (type === 'any') {
          validator = undefined
        }
        if (type === 'number') {
          validator = `@IsNumber({}, { message: '${field.description}，格式错误' })`
        }
        listDtoFields.push({
          apiProperty,
          validator,
          name: camelCaseName,
          type
        })
      }
      if (field.isSave) {
        detailFields += `'${camelCaseName}',`
        const apiProperty = `@ApiProperty({ description: '${field.description}', required: ${field.isRequired} })`
        const type = this.mapDbTypeToTsType(field.type)
        const capitalType = type.charAt(0).toUpperCase() + type.slice(1)
        let validator = `@Is${capitalType}({ message: '${field.description}，格式错误' })`
        if (type === 'any') {
          validator = undefined
        }
        if (type === 'number') {
          validator = `@IsNumber({}, { message: '${field.description}，格式错误' })`
        }
        saveDtoFields.push({
          apiProperty,
          validator,
          name: camelCaseName,
          required: field.isRequired,
          type
        })
      }
    }

    // service代码生成
    const serviceTemplate = readFileSync(
      join(process.cwd(), '/template/api/tem.service.ts.hbs'),
      'utf-8'
    )
    const serviceTemCompile = compile(serviceTemplate, { noEscape: true })
    const serviceTemCompileRes = serviceTemCompile({
      name: genApiDto.name,
      capitalName,
      description: genApiDto.description,
      selectFields,
      queryFields,
      detailFields
    })
    writeFileSync(
      join(process.cwd(), genApiDto.apiGenPath, `${genApiDto.name}.service.ts`),
      serviceTemCompileRes,
      'utf-8'
    )

    // dto代码生成
    const dtoTemplate = readFileSync(join(process.cwd(), '/template/api/tem.dto.ts.hbs'), 'utf-8')
    const dtoTemCompile = compile(dtoTemplate, { noEscape: true })
    const dtoTemCompileRes = dtoTemCompile({
      name: genApiDto.name,
      capitalName,
      description: genApiDto.description,
      listDtoFields,
      saveDtoFields
    })
    writeFileSync(
      join(process.cwd(), genApiDto.apiGenPath, `${genApiDto.name}.dto.ts`),
      dtoTemCompileRes,
      'utf-8'
    )
  }

  private mapDbTypeToTsType(dbType: string): string {
    const typeMap: Record<string, string> = {
      int: 'number',
      integer: 'number',
      tinyint: 'number',
      smallint: 'number',
      mediumint: 'number',
      bigint: 'number',
      float: 'number',
      double: 'number',
      decimal: 'number',
      numeric: 'number',
      char: 'string',
      varchar: 'string',
      text: 'string',
      tinytext: 'string',
      mediumtext: 'string',
      longtext: 'string',
      date: 'string',
      time: 'string',
      datetime: 'string',
      timestamp: 'string',
      boolean: 'boolean',
      bool: 'boolean',
      json: 'object',
      enum: 'string'
    }

    return typeMap[dbType.toLowerCase()] || 'any'
  }
}
