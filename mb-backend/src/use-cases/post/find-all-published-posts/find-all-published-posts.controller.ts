import { Controller, Get } from '@nestjs/common';
import { Post } from '@prisma/client';
import { FindAllPublishedPostsService } from './find-all-published-posts.service';

@Controller('find-all-published-posts')
export class FindAllPublishedPostsController {
  constructor(private readonly findAllPublishedPostsService: FindAllPublishedPostsService) {}

  @Get('')
  async execute(): Promise<Post[]> {
    return this.findAllPublishedPostsService.execute();
  }
}
