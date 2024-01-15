import { ApiProperty } from '@nestjs/swagger';

export class Token {
  @ApiProperty({ description: 'Token' })
  token: string;
}

export class Code {
  @ApiProperty({ description: '验证码SVG' })
  img: string;

  @ApiProperty({ description: '唯一id' })
  id: string;
}
