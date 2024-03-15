/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  UserImportDto,
  UserPageListDto,
  UserCreateDto,
  UserSelectDto,
  UserUpdateDto,
  UpdatePasswordDto
} from '@/admin/system/user/user.dto'
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
import { RoleService } from '../role/role.service'
import encrypt from '@/common/utils/encrypt'

@ApiTags('用户管理')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer token',
  example: 'Bearer token'
})
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService
  ) {}

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

  @Post('create')
  @ApiOperation({
    summary: '创建用户'
  })
  async createUser(@Body() userCreateDto: UserCreateDto, @User() user: { id: string }) {
    userCreateDto.createUserId = user.id
    userCreateDto.updateUserId = user.id
    const userEntity = await this.userService.userSaveDto2Entity(userCreateDto)
    await this.userService.saveUser(userEntity)
    return '创建用户成功'
  }

  @Post('update')
  @ApiOperation({
    summary: '更新用户'
  })
  async updateUser(@Body() userUpdateDto: UserUpdateDto, @User() user: { id: string }) {
    userUpdateDto.updateUserId = user.id
    const userEntity = new UserEntity()
    Object.assign(userEntity, omit(userUpdateDto, ['roleIds']))
    userEntity.roles = []
    if (userUpdateDto.roleIds?.length > 0) {
      userEntity.roles = await this.roleService.getRolesById(userUpdateDto.roleIds)
    }
    await this.userService.saveUser(userEntity)
    return '更新用户成功'
  }

  @Post('password')
  @ApiOperation({
    summary: '更新用户密码'
  })
  async updatePassword(@Body() updatePasswordDto: UpdatePasswordDto, @User() user: { id: string }) {
    if (updatePasswordDto.password !== updatePasswordDto.confirmPassword) {
      throw '两次密码不一致'
    }
    const userEntity = new UserEntity()
    userEntity.id = updatePasswordDto.id
    userEntity.updateUserId = user.id
    const { iv, salt, encryptedPassword } = await encrypt(updatePasswordDto.password)
    userEntity.salt = salt
    userEntity.iv = iv
    userEntity.password = encryptedPassword
    await this.userService.saveUser(userEntity)
    return '更新用户密码成功'
  }

  @Post('import')
  @ApiOperation({
    summary: '导入用户'
  })
  async importUser(@Body() userImportDto: UserImportDto, @User() user: { id: string }) {
    await validateArrObj(userImportDto.list, UserCreateDto)
    const userEntities: UserEntity[] = []
    for (const item of userImportDto.list) {
      item.createUserId = user.id
      item.updateUserId = user.id
      const userEntity = await this.userService.userSaveDto2Entity(item)
      userEntities.push(userEntity)
    }
    await this.userService.importUser(userEntities)
    return '导入用户成功'
  }

  @Get('id')
  @ApiOperation({
    summary: 'id查询用户详情'
  })
  @ApiOkResponse({
    description: 'id查询用户详情',
    type: UserSelectDto
  })
  async getUserById(@Query('id') id: string) {
    const user = await this.userService.getUserById(id)
    const userSelect = new UserSelectDto()
    if (user.roles.length) {
      userSelect.roleIds = user.roles.map((item) => item.id)
    }
    Object.assign(userSelect, omit(user, ['menus']))
    return userSelect
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
