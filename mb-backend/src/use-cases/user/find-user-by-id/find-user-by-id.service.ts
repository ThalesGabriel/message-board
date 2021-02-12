import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from 'src/repo/user/user.service';

@Injectable()
export class FindUserByIdService {
    constructor(private readonly userService: UserService) {}

    execute(id: Number): Promise<User> {
        return this.userService.find({ id: Number(id) });
    }
}
