import { ApiProperty } from '@nestjs/swagger'

export class Token {
  @ApiProperty({ description: 'Token' })
  token: string
}
