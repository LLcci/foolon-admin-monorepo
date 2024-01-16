import { IntersectionType, PickType } from '@nestjs/swagger';
import { MenuEntity } from './menu.entity';
import { PageRequestDto } from '@/common/class/response.dto';

export class MenuListDto extends IntersectionType(
  PageRequestDto,
  PickType(MenuEntity, ['name', 'menuType']),
) {}
