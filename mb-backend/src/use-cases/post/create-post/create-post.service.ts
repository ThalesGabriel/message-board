import { Injectable } from '@nestjs/common';
import { Post, Prisma, User } from '@prisma/client';
import { PostService } from 'src/repo/post/post.service';

@Injectable()
export class CreatePostService {
  constructor(private readonly postService: PostService) {}

  execute(data: Prisma.PostCreateInput): Promise<Post> {
		const { title, content, author } = data;
    return this.postService.create({
			title,
			content,
			author
		})
  }
}
