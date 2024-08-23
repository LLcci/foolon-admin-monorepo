/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DictDataEntity } from './dict.data.entity'
import { Like, Repository } from 'typeorm'
import { DictDataPageListDto } from './dict.data.dto'
import { PageResultDto } from '@/common/class/response.dto'

@Injectable()
export class DictDataService {
  constructor(
    @InjectRepository(DictDataEntity)
    private readonly dictDataRepository: Repository<DictDataEntity>
  ) {}

  async getDictDataPageList(dictDataPageListDto: DictDataPageListDto) {
    const [roles, total] = await this.dictDataRepository.findAndCount({
      where: {
        label: dictDataPageListDto.label ? Like(`%${dictDataPageListDto.label}%`) : undefined,
        value: dictDataPageListDto.value ? Like(`%${dictDataPageListDto.value}%`) : undefined,
        status: dictDataPageListDto.status,
        type: { id: dictDataPageListDto.typeId }
      },
      order: { sort: 'ASC' },
      skip: dictDataPageListDto.pageSize * (dictDataPageListDto.currentPage - 1),
      take: dictDataPageListDto.pageSize
    })
    return new PageResultDto<DictDataEntity>(
      roles,
      total,
      dictDataPageListDto.currentPage,
      dictDataPageListDto.pageSize
    )
  }

  async getDictDataList(dictDataPageListDto: DictDataPageListDto) {
    return await this.dictDataRepository.find({
      where: {
        label: dictDataPageListDto.label ? Like(`%${dictDataPageListDto.label}%`) : undefined,
        value: dictDataPageListDto.value ? Like(`%${dictDataPageListDto.value}%`) : undefined,
        status: dictDataPageListDto.status,
        type: { id: dictDataPageListDto.typeId }
      },
      order: { sort: 'ASC' }
    })
  }

  async saveDictData(dictData: DictDataEntity) {
    return await this.dictDataRepository.save(dictData)
  }

  async importDictData(dictData: DictDataEntity[]) {
    return await this.dictDataRepository.save(dictData)
  }

  async getDictDataById(id: string) {
    return await this.dictDataRepository.findOne({
      select: ['id', 'label', 'value', 'description', 'status'],
      where: { id }
    })
  }

  async deleteDictDataById(id: string[]) {
    return await this.dictDataRepository.delete(id)
  }
}
