import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserModule } from 'src/use-cases/user/create-user/create-user.module';
import { FindUserByIdModule } from '../../use-cases/user/find-user-by-id/find-user-by-id.module';
import { UserService } from './user.service';

@Module({
    imports: [FindUserByIdModule, CreateUserModule],
    providers: [UserService, PrismaService],
    exports: [UserService, PrismaService]
})
export class UserModule {}
