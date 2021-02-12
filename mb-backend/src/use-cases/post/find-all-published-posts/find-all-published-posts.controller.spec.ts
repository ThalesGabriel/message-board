import { Test, TestingModule } from '@nestjs/testing';
import { FindAllPublishedPostsController } from './find-all-published-posts.controller';

describe('FindAllPublishedPostsController', () => {
  let controller: FindAllPublishedPostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FindAllPublishedPostsController],
    }).compile();

    controller = module.get<FindAllPublishedPostsController>(FindAllPublishedPostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
