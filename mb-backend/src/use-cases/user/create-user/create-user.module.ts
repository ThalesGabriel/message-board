import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserRepoProvider } from 'src/providers/UserRepoProvider';
import { CreateUserController } from './create-user.controller';
import { CreateUserService } from './create-user.service';

@Module({
  imports: [ PrismaModule ],
  controllers: [CreateUserController],
  providers: [CreateUserService, UserRepoProvider],
  exports: [ UserRepoProvider ]
  
})
export class CreateUserModule {}

