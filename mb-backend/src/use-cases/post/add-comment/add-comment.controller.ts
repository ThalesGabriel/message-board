import { Body, Controller, Post } from '@nestjs/common';
import { AddCommentService } from './add-comment.service';

@Controller('add-comment')
export class AddCommentController {
    constructor(
        private readonly addCommentService: AddCommentService,
      ) {}
    
      @Post('')
      async execute(
            @Body() commentData: { description: string; postId: number }
        ): Promise<any> {
        return this.addCommentService.execute(commentData);
      }
}
