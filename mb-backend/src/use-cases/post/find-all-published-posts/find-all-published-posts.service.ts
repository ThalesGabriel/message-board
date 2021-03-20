import { Injectable } from '@nestjs/common';
import { Post } from '@prisma/client';
import { PostService } from 'src/repo/post/post.service';

@Injectable()
export class FindAllPublishedPostsService {
    constructor(private readonly postService: PostService) {}

    execute({ skip, take }): Promise<Post[]> {
        return this.postService.findAll({where: { published: true }, skip, take});
    }
}
