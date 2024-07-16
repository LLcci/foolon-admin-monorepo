import { Type, applyDecorators } from '@nestjs/common'
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger'
import { PageResultDto } from '../class/response.dto'

export const ApiPaginatedResponse = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiExtraModels(PageResultDto, model),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PageResultDto) },
          {
            required: ['records'],
            properties: {
              records: {
                type: 'array',
                items: { $ref: getSchemaPath(model) }
              }
            }
          }
        ]
      }
    })
  )
}
