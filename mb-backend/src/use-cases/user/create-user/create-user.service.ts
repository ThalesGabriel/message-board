import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories/UserRepository';
import { UserDTO } from '../user.dto';

const UserRepo = () => Inject('UserRepo');

@Injectable()
export class CreateUserService {
    constructor(
        @UserRepo() private readonly userProvider: UserRepository
    ) {}

    async create(data: UserDTO): Promise<UserDTO> {
        const userAlreadyExists = await this.userProvider.findByEmail(data.email)

        if(userAlreadyExists) throw new Error("Email already exists in database.")

        const newUser = await this.userProvider.create(data)

        return new UserDTO
    }
}
