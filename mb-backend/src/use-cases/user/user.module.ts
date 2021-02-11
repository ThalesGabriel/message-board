import { Module } from '@nestjs/common';

import { CreateUserModule } from './create-user/create-user.module';
import { FindUserController } from './find-user/find-user.controller';
import { FindUserService } from './find-user/find-user.service';
import { FindUserModule } from './find-user/find-user.module';
import { FindUserByEmailController } from './find-user-by-email/find-user-by-email.controller';
import { FindUserByEmailService } from './find-user-by-email/find-user-by-email.service';
import { FindUserByEmailModule } from './find-user-by-email/find-user-by-email.module';

@Module({
  imports: [ CreateUserModule, FindUserModule, FindUserByEmailModule ],
  controllers: [],
  providers: [],
})
export class UserModule {}
