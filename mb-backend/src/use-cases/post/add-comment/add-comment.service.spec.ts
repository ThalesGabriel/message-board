import { Test, TestingModule } from '@nestjs/testing';
import { AddCommentService } from './add-comment.service';

describe('AddCommentService', () => {
  let service: AddCommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddCommentService],
    }).compile();

    service = module.get<AddCommentService>(AddCommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
