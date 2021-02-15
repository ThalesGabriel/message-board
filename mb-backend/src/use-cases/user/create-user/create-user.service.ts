import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { UserService } from 'src/repo/user/user.service';
import { EncryptService } from 'src/adapters/encrypt/encrypt.service';

@Injectable()
export class CreateUserService {
    constructor(
        private readonly userService: UserService,
        private readonly encryptService: EncryptService
    ) {}

    async execute(data: Prisma.UserCreateInput): Promise<User | null> {
        const userAlreadyExists = await this.userService.find({ email: data.email })

        if(userAlreadyExists) throw new HttpException('User email already exists.', HttpStatus.FORBIDDEN);
        
        data.password = await this.encryptService.execute(data.password)
        
        return this.userService.create(data);
    }
}
