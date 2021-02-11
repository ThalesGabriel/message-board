import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories/UserRepository';
import { UserDTO } from '../user.dto';

const UserRepo = () => Inject('UserRepo');

@Injectable()
export class FindUserService {
    constructor(
        @UserRepo() private readonly userProvider: UserRepository
    ) {}

    async execute(): Promise<UserDTO[]> {
        return [new UserDTO]
    }
}

