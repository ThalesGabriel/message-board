import { Module } from '@nestjs/common';
import { FindPostByTitleService } from './find-post-by-title.service';
import { FindPostByTitleController } from './find-post-by-title.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostService } from 'src/repo/post/post.service';

@Module({
  providers: [FindPostByTitleService, PostService, PrismaService],
  controllers: [FindPostByTitleController]
})
export class FindPostByTitleModule {}
