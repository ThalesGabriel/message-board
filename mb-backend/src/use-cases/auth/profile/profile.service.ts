import { Injectable } from '@nestjs/common';
import { UserService } from 'src/repo/user/user.service';

@Injectable()
export class ProfileService {
    constructor(private readonly userService: UserService) {}

    async execute(id: number) {
        return this.userService.find({id});
    }
}
