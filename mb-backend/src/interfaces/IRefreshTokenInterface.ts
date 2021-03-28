import { Prisma, RefreshToken } from "@prisma/client";
import UserDto from "src/domain/dto/user.dto";

export interface IRefreshTokenInterface {
    create(user: UserDto, ttl: number): Promise<RefreshToken | null>;
    findById(id: number): Promise<RefreshToken | null>;
}