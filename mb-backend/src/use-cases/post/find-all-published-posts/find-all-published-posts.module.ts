import { Module } from '@nestjs/common';
import { FindAllPublishedPostsService } from './find-all-published-posts.service';
import { FindAllPublishedPostsController } from './find-all-published-posts.controller';
import { PostService } from 'src/repo/post/post.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [FindAllPublishedPostsService, PostService, PrismaService],
  controllers: [FindAllPublishedPostsController]
})
export class FindAllPublishedPostsModule {}
