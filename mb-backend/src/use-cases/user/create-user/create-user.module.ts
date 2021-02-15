import { Module } from '@nestjs/common';
import { CreateUserService } from './create-user.service';
import { CreateUserController } from './create-user.controller';
import { UserService } from 'src/repo/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { EncryptService } from 'src/adapters/encrypt/encrypt.service';
import { EncryptModule } from 'src/adapters/encrypt/encrypt.module';

@Module({
  imports: [EncryptModule],
  controllers: [CreateUserController],
  providers: [CreateUserService, UserService, PrismaService, EncryptModule]
})
export class CreateUserModule {}
