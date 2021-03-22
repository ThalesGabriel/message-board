import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { IUserInterface } from 'src/interfaces/IUserInterface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService implements IUserInterface {
  constructor(private readonly prismaService: PrismaService) {}

  async find(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: userWhereUniqueInput,
      include: {
        avatar: {
          select: {
            file: {
              select: {
                filename: true
              }
            }
          }
        }
      },
    });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prismaService.user.create({
      data,
    });
  }

	async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

	async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prismaService.user.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prismaService.user.delete({
      where,
    });
  }
}
