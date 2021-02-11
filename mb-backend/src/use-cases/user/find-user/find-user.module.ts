import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserRepoProvider } from 'src/providers/UserRepoProvider';
import { UserRepository } from 'src/repositories/UserRepository';
import { FindUserController } from './find-user.controller';
import { FindUserService } from './find-user.service';

@Module({})
@Module({
  imports: [ PrismaModule ],
  controllers: [FindUserController],
  providers: [FindUserService, UserRepoProvider],
  exports: [UserRepoProvider]
})
export class FindUserModule {}
