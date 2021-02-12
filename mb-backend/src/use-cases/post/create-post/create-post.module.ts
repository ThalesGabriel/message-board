import { Module } from '@nestjs/common';
import { CreatePostService } from './create-post.service';
import { CreatePostController } from './create-post.controller';
import { PostService } from 'src/repo/post/post.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [CreatePostService, PostService, PrismaService],
  controllers: [CreatePostController]
})
export class CreatePostModule {}
