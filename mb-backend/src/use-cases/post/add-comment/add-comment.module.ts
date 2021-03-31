import { Module } from '@nestjs/common';
import { AddCommentController } from './add-comment.controller';
import { AddCommentService } from './add-comment.service';

@Module({
  controllers: [AddCommentController],
  providers: [AddCommentService]
})
export class AddCommentModule {}
