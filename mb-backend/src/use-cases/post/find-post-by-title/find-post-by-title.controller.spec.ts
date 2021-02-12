import { Test, TestingModule } from '@nestjs/testing';
import { FindPostByTitleController } from './find-post-by-title.controller';

describe('FindPostByTitleController', () => {
  let controller: FindPostByTitleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FindPostByTitleController],
    }).compile();

    controller = module.get<FindPostByTitleController>(FindPostByTitleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
