import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FileUploadModule } from 'src/use-cases/file-upload/file-upload.module';
import { MediaService } from './media.service';

@Module({
  imports: [FileUploadModule],
  providers: [MediaService, PrismaService],
  exports: [MediaService, PrismaService]
})
export class MediaModule {}
