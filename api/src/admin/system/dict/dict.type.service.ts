/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DictTypeEntity } from './dict.type.entity'
import { Like, Repository } from 'typeorm'
import { DictTypePageListDto, SaveDictTypeDto } from './dict.type.dto'
import { PageResultDto } from '@/common/class/response.dto'

@Injectable()
export class DictTypeService {
  constructor(
    @InjectRepository(DictTypeEntity)
    private readonly dictTypeRepository: Repository<DictTypeEntity>
  ) {}

  async getDictTypePageList(dictTypePageListDto: DictTypePageListDto) {
    const [roles, total] = await this.dictTypeRepository.findAndCount({
      where: {
        name: dictTypePageListDto.name ? Like(`%${dictTypePageListDto.name}%`) : undefined,
        code: dictTypePageListDto.code ? Like(`%${dictTypePageListDto.code}%`) : undefined,
        status: dictTypePageListDto.status
      },
      order: { createTime: 'DESC' },
      skip: dictTypePageListDto.pageSize * (dictTypePageListDto.currentPage - 1),
      take: dictTypePageListDto.pageSize
    })
    return new PageResultDto<DictTypeEntity>(
      roles,
      total,
      dictTypePageListDto.currentPage,
      dictTypePageListDto.pageSize
    )
  }

  async getDictTypeList(dictTypePageListDto: DictTypePageListDto) {
    return await this.dictTypeRepository.find({
      where: {
        name: dictTypePageListDto.name ? Like(`%${dictTypePageListDto.name}%`) : undefined,
        code: dictTypePageListDto.code ? Like(`%${dictTypePageListDto.code}%`) : undefined,
        status: dictTypePageListDto.status
      },
      order: { createTime: 'DESC' }
    })
  }

  async saveDictType(dictType: SaveDictTypeDto) {
    return await this.dictTypeRepository.save(dictType)
  }

  async importDictType(dictType: DictTypeEntity[]) {
    return await this.dictTypeRepository.save(dictType)
  }

  async getDictTypeById(id: string) {
    return await this.dictTypeRepository.findOne({
      select: ['id', 'name', 'code', 'description', 'status'],
      where: { id }
    })
  }

  async getDictTypeByCodeWithData(code: string) {
    return await this.dictTypeRepository.findOne({
      select: ['id', 'name', 'code', 'description', 'status'],
      where: { code },
      relations: ['data'],
      order: { data: { sort: 'ASC' } }
    })
  }

  async deleteDictTypeById(id: string[]) {
    return await this.dictTypeRepository.delete(id)
  }
}
