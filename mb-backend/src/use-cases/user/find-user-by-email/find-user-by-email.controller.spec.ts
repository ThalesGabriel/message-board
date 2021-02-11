import { Test, TestingModule } from '@nestjs/testing';
import { FindUserByEmailController } from './find-user-by-email.controller';

describe('FindUserByEmailController', () => {
  let controller: FindUserByEmailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FindUserByEmailController],
    }).compile();

    controller = module.get<FindUserByEmailController>(FindUserByEmailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
