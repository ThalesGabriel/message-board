import { Injectable } from '@nestjs/common';
import { RefreshToken } from '@prisma/client';
import UserDto from 'src/domain/dto/user.dto';
import { IRefreshTokenInterface } from 'src/interfaces/IRefreshTokenInterface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RefreshTokenService implements IRefreshTokenInterface {
    constructor(
        private readonly prismaService: PrismaService,
    ) {}

    public async create(user: UserDto, ttl: number): Promise<RefreshToken> {
        console.log('user', user)
        const expiration = new Date()
        expiration.setTime(expiration.getTime() + ttl)
        return await this.prismaService.refreshToken.create({
            data: {
                user: {
                    connect: { 
                        email: user.email
                    }
                },
                is_revoked: false,
                expires: expiration
            }
        })
      }
    
      public async findById(id: number): Promise<RefreshToken | null> {
        return await this.prismaService.refreshToken.findUnique({
            where: {
                id
            }
        })
      }
}
