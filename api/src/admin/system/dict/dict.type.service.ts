/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DictTypeEntity } from './dict.type.entity'
import { In, Like, Repository } from 'typeorm'
import { DictTypePageListDto, SaveDictTypeDto } from './dict.type.dto'
import { PageResultDto } from '@/common/class/response.dto'
import { RedisService } from '@/global/redis/redis.service'

@Injectable()
export class DictTypeService {
  constructor(
    @InjectRepository(DictTypeEntity)
    private readonly dictTypeRepository: Repository<DictTypeEntity>,
    private readonly redisService: RedisService
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
    const dict = await this.dictTypeRepository.save(dictType)
    const dictWidthData = await this.getDictTypeByIdWithData(dict.id)
    if (dictWidthData) {
      await this.redisService.setDictByCode(dictWidthData)
    }
    return dict
  }

  async importDictType(dictType: DictTypeEntity[]) {
    const dict = await this.dictTypeRepository.save(dictType)
    const dictWidthData = await this.getDictTypeListByIdsWithData(dict.map((item) => item.id))
    if (dictWidthData && dictWidthData.length > 0) {
      await this.redisService.mSetDictByCode(dictWidthData)
    }
    return dict
  }

  async getDictTypeById(id: string) {
    return await this.dictTypeRepository.findOne({
      select: ['id', 'name', 'code', 'description', 'status'],
      where: { id }
    })
  }

  async getDictTypeByIdWithData(id: string) {
    return await this.dictTypeRepository.findOne({
      select: ['id', 'name', 'code', 'description', 'status'],
      where: { id, status: '1', data: { status: '1' } },
      relations: ['data'],
      order: { data: { sort: 'ASC' } }
    })
  }

  async getDictTypeListByIdsWithData(ids: string[]) {
    return await this.dictTypeRepository.find({
      select: ['id', 'name', 'code', 'description', 'status'],
      where: { id: In(ids), status: '1', data: { status: '1' } },
      relations: ['data'],
      order: { data: { sort: 'ASC' } }
    })
  }

  async getDictTypeByCodeWithData(code: string) {
    return await this.redisService.getDictByCode(code)
  }

  async deleteDictTypeById(id: string[]) {
    const dictWidthData = await this.getDictTypeListByIdsWithData(id)
    if (dictWidthData && dictWidthData.length > 0) {
      await this.redisService.mDeleteDictByCode(dictWidthData.map((item) => item.code))
    }
    const result = await this.dictTypeRepository.delete(id)
    return result
  }

  async initDictToRedis() {
    const dictTypeList = await this.dictTypeRepository.find({
      select: ['id', 'name', 'code', 'description', 'status'],
      where: { status: '1', data: { status: '1' } },
      relations: ['data'],
      order: { data: { sort: 'ASC' } }
    })
    await this.redisService.initDictList(dictTypeList)
  }
}
