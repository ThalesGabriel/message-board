import { Test, TestingModule } from '@nestjs/testing';
import { FindAllPostsService } from './find-all-published-posts.service';

describe('FindAllPostsService', () => {
  let service: FindAllPostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindAllPostsService],
    }).compile();

    service = module.get<FindAllPostsService>(FindAllPostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
