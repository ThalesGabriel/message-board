import { Controller, Get, Param } from '@nestjs/common';
import { Post } from '@prisma/client';
import { FindPostByTitleService } from './find-post-by-title.service';

@Controller('find-post-by-title')
export class FindPostByTitleController {
    constructor(private readonly findPostByTitleService: FindPostByTitleService) {}

    // @Get()
    // execute(@Param('title') title: string): Promise<Post> {
    //     return this.findPostByTitleService.execute(title)
    // }
}
