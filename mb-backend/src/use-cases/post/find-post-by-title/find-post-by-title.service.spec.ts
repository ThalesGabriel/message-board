import { Test, TestingModule } from '@nestjs/testing';
import { FindPostByTitleService } from './find-post-by-title.service';

describe('FindPostByTitleService', () => {
  let service: FindPostByTitleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindPostByTitleService],
    }).compile();

    service = module.get<FindPostByTitleService>(FindPostByTitleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
