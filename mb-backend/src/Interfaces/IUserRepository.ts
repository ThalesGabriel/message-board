import { UserDTO } from "src/use-cases/user/user.dto";

export interface IUserRepository {
    findAll(): Promise<UserDTO[]>
    create(newUser: UserDTO): Promise<UserDTO>
    findByEmail(email: string): Promise<UserDTO>
}