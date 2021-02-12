import { Post, Prisma } from "@prisma/client";

export interface IPostInterface {
  find(where: Prisma.PostWhereUniqueInput): Promise<Post>;
  create(data: Prisma.PostCreateInput): Promise<Post>;
  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PostWhereUniqueInput;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByInput;
  }): Promise<Post[]>;
  update(params: {
    where: Prisma.PostWhereUniqueInput;
    data: Prisma.PostUpdateInput;
  }): Promise<Post>;
  delete(where: Prisma.PostWhereUniqueInput): Promise<Post>;
}