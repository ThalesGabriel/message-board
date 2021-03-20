import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';
import { PostService } from 'src/repo/post/post.service';
import { UserService } from 'src/repo/user/user.service';

@Injectable()
export class CreatePostService {
  constructor(
		private readonly postService: PostService,
		private readonly userService: UserService
	) {}

  async execute(postData: { title: string; content?: string; authorEmail: string, draft: boolean }): Promise<any> {
		const { title, content, authorEmail, draft } = postData;

		const user = await this.userService.find({ email: authorEmail })

    if(!user) throw new HttpException('User does not exists.', HttpStatus.FORBIDDEN);
		
    const createPost = await this.postService.create({
      title,
      content,
			published: draft,
      author: {
        connect: { email: authorEmail },
      },
    });
    return { ...createPost, authorName: user.name }
  }
}
