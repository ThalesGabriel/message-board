import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FileUploadModule } from 'src/use-cases/file-upload/file-upload.module';
import { FileService } from './file.service';

@Module({
  imports: [FileUploadModule],
  providers: [FileService, PrismaService],
  exports: [FileService, PrismaService]
})
export class FileModule {}
