import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostModule } from 'src/use-cases/post/create-post/create-post.module';
import { FindPostByTitleModule } from 'src/use-cases/post/find-post-by-title/find-post-by-title.module';
import { PostService } from './post.service';
import { FindAllPublishedPostsModule } from "src/use-cases/post/find-all-published-posts/find-all-published-posts.module"

@Module({
    imports: [FindPostByTitleModule, CreatePostModule, FindAllPublishedPostsModule],
    providers: [PrismaService, PostService],
    exports: [PrismaService, PostService]
})
export class PostModule {}