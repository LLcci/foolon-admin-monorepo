import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger';
import { MenuEntity } from './menu.entity';
import { PageRequestDto } from '@/common/class/response.dto';
import { ArrayNotEmpty, IsArray } from 'class-validator';

export class MenuListDto extends PickType(MenuEntity, ['name', 'status']) {}

export class MenuPageListDto extends IntersectionType(
  PageRequestDto,
  MenuListDto,
) {}

export class MenuSaveDto {
  @ApiProperty({
    description: '菜单列表',
    required: true,
    type: MenuEntity,
    isArray: true,
  })
  @IsArray({
    message: '菜单列表格式不正确',
  })
  @ArrayNotEmpty({ message: '菜单列表不能为空' })
  list: MenuEntity[];
}

export class MenuTree extends MenuEntity {
  children: MenuTree[];
}
