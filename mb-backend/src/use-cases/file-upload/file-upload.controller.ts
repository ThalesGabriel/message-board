import { Body, Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import PostDto from 'src/domain/dto/post.dto';
import UserDto from 'src/domain/dto/user.dto';
import { FileUploadService } from './file-upload.service';

@Controller('file-upload')
export class FileUploadController {
    constructor(
        private readonly fileUploadService: FileUploadService
    ) { }

    @Post('one')
    @UseInterceptors(FileInterceptor('image'))
    uploadFile(@UploadedFile() image: Express.Multer.File, @Body() postData: {user: UserDto, post: PostDto}) {
       const { user, post } = postData
       console.log('image', image)
       return this.fileUploadService.create(image, user, post)
    }

    @Post('many')
    @UseInterceptors(FilesInterceptor('files'))
    uploadFiles(@UploadedFiles() files: Express.Multer.File) {
        console.log(files);
    }
}
