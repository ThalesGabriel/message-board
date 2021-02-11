import { Inject, Injectable } from "@nestjs/common";
import { IUserRepository } from "src/Interfaces/IUserRepository";
import { UserDTO } from "src/use-cases/user/user.dto";

@Injectable()
export class UserRepository implements IUserRepository {
    constructor() {}

    public async create(newUser: UserDTO): Promise<UserDTO> {
        return null
    }
    public async findAll(): Promise<UserDTO[]> {
        return null
    }
    public async findByEmail(email: String): Promise<UserDTO> {
        return null
    }
}