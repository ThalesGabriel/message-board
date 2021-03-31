import { Test, TestingModule } from '@nestjs/testing';
import { AddCommentController } from './add-comment.controller';

describe('AddCommentController', () => {
  let controller: AddCommentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddCommentController],
    }).compile();

    controller = module.get<AddCommentController>(AddCommentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
