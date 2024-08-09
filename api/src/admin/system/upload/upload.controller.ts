import { compressImg2Webp, deleteFile } from '@/common/utils/file'
import {
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
import { ApiConsumes, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger'
import { diskStorage } from 'multer'
import { extname } from 'path'

@ApiTags('上传文件')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer token',
  example: 'Bearer token'
})
@Controller('upload')
export class UploadController {
  @Post('img')
  @ApiOperation({
    summary: '上传图片'
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload/',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
          const filename = 'img' + '-' + uniqueSuffix + extname(file.originalname)
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
            fileType: '.(jpg|jpeg|png|svg|webp)'
          })
        ],
        fileIsRequired: false
      })
    )
    file: Express.Multer.File
  ) {
    if (!file) {
      throw '文件上传失败'
    }
    if (file.size > 51200) {
      const quality = Math.floor(file.size / 51200)
      await compressImg2Webp(file.path, quality)
      await deleteFile(file.path)
      return `${file.filename.split('.')[0]}.webp`
    }
    return file.filename
  }

  @Get('delete')
  async deleteAvatar(@Query('filename') filename: string) {
    try {
      await deleteFile(`./upload/${filename}`)
      return '删除成功'
    } catch (error) {
      throw `删除失败,${error}`
    }
  }
}
