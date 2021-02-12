import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/repo/user/user.service';
import { FindUserByIdController } from './find-user-by-id.controller';
import { FindUserByIdService } from './find-user-by-id.service';

@Module({
  controllers: [FindUserByIdController],
  providers: [FindUserByIdService, UserService, PrismaService]
})
export class FindUserByIdModule {}
