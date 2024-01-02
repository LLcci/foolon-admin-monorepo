/*
https://docs.nestjs.com/controllers#controllers
*/

import { CreateUserDto } from '@/admin/system/user/user.dto';
import { UserService } from '@/admin/system/user/user.service';
import {
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('用户管理')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer token',
  example: 'Bearer token',
})
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @ApiOperation({
    summary: '创建用户',
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('avatarFile', {
      storage: diskStorage({
        destination: './upload/avatar/',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const filename =
            'avatar' + '-' + uniqueSuffix + extname(file.originalname);
          cb(null, filename);
        },
      }),
    }),
  )
  async createUser(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType: '.(jpg|jpeg|png|gif|bmp|webp)',
          }),
          new MaxFileSizeValidator({
            maxSize: 51200,
            message: '文件大小不能超过50kb',
          }),
        ],
        fileIsRequired: false,
      }),
    )
    avatarFile: Express.Multer.File,
    @Body() createUserDto: CreateUserDto,
    @Request() req,
  ) {
    if (avatarFile) {
      createUserDto.avatar = `/avatar/${avatarFile.filename}`;
    }
    createUserDto.createUserId = req.user.id;
    return await this.userService.createUser(createUserDto);
  }
}
