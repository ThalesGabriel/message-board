import { Injectable } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async find(
    postWhereUniqueInput: Prisma.PostWhereUniqueInput,
  ): Promise<Post | null> {
    return this.prismaService.post.findUnique({
      where: postWhereUniqueInput,
    });
  }

  async create(data: Prisma.PostCreateInput): Promise<Post> {
    return this.prismaService.post.create({
      data,
    });
  }

	async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PostWhereUniqueInput;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByInput;
  }): Promise<Post[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.post.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
	}

	async update(params: {
    where: Prisma.PostWhereUniqueInput;
    data: Prisma.PostUpdateInput;
  }): Promise<Post> {
    const { data, where } = params;
    return this.prismaService.post.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.PostWhereUniqueInput): Promise<Post> {
    return this.prismaService.post.delete({
      where,
    });
  }
}
