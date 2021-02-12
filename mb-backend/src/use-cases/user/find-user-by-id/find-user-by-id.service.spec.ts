import { Test, TestingModule } from '@nestjs/testing';
import { FindUserByIdService } from './find-user-by-id.service';

describe('FindUserByIdService', () => {
  let service: FindUserByIdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindUserByIdService],
    }).compile();

    service = module.get<FindUserByIdService>(FindUserByIdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
