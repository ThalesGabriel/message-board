import { Test, TestingModule } from '@nestjs/testing';
import { FindUserByEmailService } from './find-user-by-email.service';

describe('FindUserByEmailService', () => {
  let service: FindUserByEmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindUserByEmailService],
    }).compile();

    service = module.get<FindUserByEmailService>(FindUserByEmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
