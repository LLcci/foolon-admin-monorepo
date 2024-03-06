/*
https://docs.nestjs.com/controllers#controllers
*/

import { UserImportDto, UserPageListDto, UserSaveDto } from '@/admin/system/user/user.dto'
import { UserService } from '@/admin/system/user/user.service'
import { PageResultDto } from '@/common/class/response.dto'
import { User } from '@/common/decorator/user.decorator'
import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  ParseFilePipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiConsumes, ApiHeader, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { diskStorage } from 'multer'
import { extname } from 'path'
import { UserEntity } from './user.entity'
import validateArrObj from '@/common/utils/validateArrObj'
import { omit } from 'lodash'
import { DeleteResult } from 'typeorm'
import { compressImg2Webp, deleteFile } from '@/common/utils/file'

@ApiTags('用户管理')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer token',
  example: 'Bearer token'
})
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('page')
  @ApiOperation({
    summary: '分页用户列表'
  })
  @ApiOkResponse({
    description: '分页用户列表',
    type: PageResultDto<UserEntity>
  })
  async getUserPageList(@Body() userPageListDto: UserPageListDto) {
    const list = await this.userService.getUserList(userPageListDto)
    return new PageResultDto<UserEntity>(
      list,
      userPageListDto.currentPage,
      userPageListDto.pageSize
    )
  }

  @Post('list')
  @ApiOperation({
    summary: '用户列表'
  })
  @ApiOkResponse({
    description: '用户列表',
    type: UserEntity,
    isArray: true
  })
  async getUserList(@Body() userPageListDto: UserPageListDto) {
    return await this.userService.getUserList(userPageListDto)
  }

  @Post('save')
  @ApiOperation({
    summary: '保存用户'
  })
  @ApiOkResponse({
    description: '保存用户',
    type: UserEntity
  })
  async saveUser(@Body() userSaveDto: UserSaveDto, @User() user: { id: string; iv: string }) {
    if (!userSaveDto.id) {
      userSaveDto.createUserId = user.id
    }
    userSaveDto.updateUserId = user.id
    return await this.userService.saveUser(userSaveDto)
  }

  @Post('import')
  @ApiOperation({
    summary: '导入用户'
  })
  @ApiOkResponse({
    description: '导入用户',
    type: UserEntity,
    isArray: true
  })
  async importUser(@Body() userImportDto: UserImportDto, @User() user: { id: string; iv: string }) {
    await validateArrObj(userImportDto.list, UserSaveDto)
    for (const item of userImportDto.list) {
      if (!item.id) {
        item.createUserId = user.id
      }
      item.updateUserId = user.id
    }
    return await this.userService.importUser(userImportDto)
  }

  @Get('id')
  @ApiOperation({
    summary: 'id查询用户详情'
  })
  @ApiOkResponse({
    description: 'id查询用户详情',
    type: UserSaveDto
  })
  async getUserById(@Query('id') id: string) {
    const user = await this.userService.getUserById(id)
    const userSave = new UserSaveDto()
    if (user.roles.length) {
      userSave.roleIds = user.roles.map((item) => item.id)
    }
    Object.assign(userSave, omit(user, ['menus']))
    return userSave
  }

  @Post('delete')
  @ApiOperation({
    summary: 'id删除用户'
  })
  @ApiOkResponse({
    description: 'id删除用户',
    type: DeleteResult
  })
  async deleteUserById(@Body('id') id: string[]) {
    return await this.userService.deleteUserById(id)
  }

  @Post('upload')
  @ApiOperation({
    summary: '上传头像'
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('avatarFile', {
      storage: diskStorage({
        destination: './upload/avatar/',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
          const filename = 'avatar' + '-' + uniqueSuffix + extname(file.originalname)
          cb(null, filename)
        }
      })
    })
  )
  async upload(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType: '.(jpg|jpeg|png)'
          })
        ],
        fileIsRequired: false
      })
    )
    avatarFile: Express.Multer.File
  ) {
    if (!avatarFile) {
      throw '文件上传失败'
    }
    if (avatarFile.size > 51200) {
      const quality = Math.floor(avatarFile.size / 51200)
      await compressImg2Webp(avatarFile.path, quality)
      await deleteFile(avatarFile.path)
      return `${avatarFile.filename.split('.')[0]}.webp`
    }
    return avatarFile.filename
  }

  @Get('deleteAvatar')
  async deleteAvatar(@Query('filename') filename: string) {
    try {
      await deleteFile(`./upload/avatar/${filename}`)
      return '删除成功'
    } catch (error) {
      throw `删除失败,${error}`
    }
  }
}
