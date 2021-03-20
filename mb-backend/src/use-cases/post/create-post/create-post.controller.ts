import { Body, Controller, Post } from '@nestjs/common';
import { Post as PostModel } from '@prisma/client';
import { CreatePostService } from './create-post.service';

@Controller('create-post')
export class CreatePostController {
  constructor(
    private readonly createPostService: CreatePostService,
  ) {}

  @Post('')
  async execute(
		@Body() postData: { title: string; content?: string; authorEmail: string, draft: boolean }
	): Promise<any> {
    return this.createPostService.execute(postData);
  }
}
