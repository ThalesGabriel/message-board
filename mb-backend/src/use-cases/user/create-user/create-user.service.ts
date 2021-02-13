import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { ResponseDTO } from 'src/domain/DTO/ResponseDTO';
import { UserService } from 'src/repo/user/user.service';

@Injectable()
export class CreateUserService {
    constructor(private readonly userService: UserService) {}

    async execute(data: Prisma.UserCreateInput): Promise<User | {}> {
        return this.userService.create(data);
    }
}
