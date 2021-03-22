import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { PrismaService } from 'src/prisma/prisma.service';
import { FileService } from 'src/repo/file/file.service';
import { MediaService } from 'src/repo/media/media.service';
import { UserService } from 'src/repo/user/user.service';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from './file-upload.service';

@Module({
  imports: [
    MulterModule.register({
      dest: '../mb-frontend/public/tmp/uploads'
    }),
  ],
  controllers: [FileUploadController],
  providers: [FileUploadService, FileService, MediaService, PrismaService, UserService]
})
export class FileUploadModule {}
