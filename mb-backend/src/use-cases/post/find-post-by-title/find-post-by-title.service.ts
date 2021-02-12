import { Injectable } from '@nestjs/common';
import { Post } from '@prisma/client';
import { PostService } from 'src/repo/post/post.service';

@Injectable()
export class FindPostByTitleService {
    constructor(private readonly postService: PostService) {}

    execute(title: string): Promise<Post> {
        return this.postService.find({ title: title });
    }
}
