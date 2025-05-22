/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DictDataEntity } from './dict.data.entity'
import { In, Like, Repository } from 'typeorm'
import { DictDataPageListDto } from './dict.data.dto'
import { PageResultDto } from '@/common/class/response.dto'
import { DictTypeService } from './dict.type.service'
import { RedisService } from '@/global/redis/redis.service'

@Injectable()
export class DictDataService {
  constructor(
    @InjectRepository(DictDataEntity)
    private readonly dictDataRepository: Repository<DictDataEntity>,
    private readonly dictTypeService: DictTypeService,
    private readonly redisService: RedisService
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
    const data = await this.dictDataRepository.save(dictData)
    const dictWidthData = await this.dictTypeService.getDictTypeByIdWithData(dictData.type.id)
    if (dictWidthData) {
      await this.redisService.setDictByCode(dictWidthData)
    }
    return data
  }

  async importDictData(dictData: DictDataEntity[]) {
    const data = await this.dictDataRepository.save(dictData)
    const dictWidthData = await this.dictTypeService.getDictTypeByIdWithData(dictData[0].type.id)
    if (dictWidthData) {
      await this.redisService.setDictByCode(dictWidthData)
    }
    return data
  }

  async getDictDataById(id: string) {
    return await this.dictDataRepository.findOne({
      select: ['id', 'label', 'value', 'description', 'status', 'default'],
      where: { id }
    })
  }

  async deleteDictDataById(id: string[]) {
    const dictData = await this.dictDataRepository.find({
      where: { id: In(id) },
      relations: ['type']
    })
    const data = await this.dictDataRepository.delete(id)
    const dictWidthData = await this.dictTypeService.getDictTypeByIdWithData(dictData[0].type.id)
    if (dictWidthData) {
      await this.redisService.setDictByCode(dictWidthData)
    } else {
      await this.redisService.deleteDictByCode(dictData[0].type.code)
    }
    return data
  }
}
