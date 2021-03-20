import { Module } from '@nestjs/common';
import { CreatePostService } from './create-post.service';
import { CreatePostController } from './create-post.controller';
import { PostService } from 'src/repo/post/post.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/repo/user/user.service';

@Module({
  providers: [CreatePostService, PostService, PrismaService, UserService],
  controllers: [CreatePostController]
})
export class CreatePostModule {}
