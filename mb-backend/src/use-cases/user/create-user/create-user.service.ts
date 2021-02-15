import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { UserService } from 'src/repo/user/user.service';

@Injectable()
export class CreateUserService {
    constructor(private readonly userService: UserService) {}

    async execute(data: Prisma.UserCreateInput): Promise<User | null> {
        const userAlreadyExists = await this.userService.find({ email: data.email })

        if(userAlreadyExists) throw new HttpException('User email already exists.', HttpStatus.FORBIDDEN);
        
        return this.userService.create(data);
    }
}
