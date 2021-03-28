import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { Post } from '@prisma/client';
import { JwtAuthGuard } from 'src/adapters/auth/implementation/passport/jwt-auth.guard';
import { FindAllPublishedPostsService } from './find-all-published-posts.service';

@Controller('find-all-published-posts')
export class FindAllPublishedPostsController {
  constructor(private readonly findAllPublishedPostsService: FindAllPublishedPostsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('')
  async execute(@Query() query): Promise<Post[]> {
    const { skip, take } = query
    let numberSkip = skip? parseInt(skip) : undefined
    let numberTake = take? parseInt(take) : undefined
    return this.findAllPublishedPostsService.execute({skip: numberSkip, take: numberTake});
  }
}
