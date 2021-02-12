import { Module } from '@nestjs/common';
import { CreateUserService } from './create-user.service';
import { CreateUserController } from './create-user.controller';
import { UserService } from 'src/repo/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CreateUserController],
  providers: [CreateUserService, UserService, PrismaService]
})
export class CreateUserModule {}
