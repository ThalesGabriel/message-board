import { Injectable } from '@nestjs/common';
import { CommentService } from 'src/repo/comment/comment.service';

@Injectable()
export class AddCommentService {
    constructor(
        private readonly commentService: CommentService
    ) {}

    async execute(commentData: { description: string; postId: number}): Promise<any> {
		const { description, postId } = commentData;
		
        return await this.commentService.create({
            description,
            post: {
                connect: { id: postId },
            },
        });
    
  }
}
