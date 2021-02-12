import { Prisma, User } from '@prisma/client';

export interface IUserInterface {
  find(where: Prisma.UserWhereUniqueInput): Promise<User>;
  create(data: Prisma.UserCreateInput): Promise<User>;
  update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User>;
  delete(where: Prisma.UserWhereUniqueInput): Promise<User>;
  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByInput;
  }): Promise<User[]>;
}
