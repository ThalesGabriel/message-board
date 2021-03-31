import { Comments, Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { ICommentsInterface } from 'src/interfaces/ICommentsInterface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService implements ICommentsInterface{
    constructor(private readonly prismaService: PrismaService) {}

  async find(
    commentsWhereUniqueInput: Prisma.CommentsWhereUniqueInput,
  ): Promise<Comments | null> {
    return this.prismaService.comments.findUnique({
      where: commentsWhereUniqueInput,
    });
  }

  async create(data: Prisma.CommentsCreateInput): Promise<Comments> {
    return this.prismaService.comments.create({
      data,
    });
  }

	async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CommentsWhereUniqueInput;
    where?: Prisma.CommentsWhereInput;
    orderBy?: Prisma.CommentsOrderByInput;
  }): Promise<Comments[]> {
    const { skip, take, cursor, where, orderBy } = params;
    console.log(params)
    return this.prismaService.comments.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy: {
        createdAt:"desc",
      },
    });
	}

	async update(params: {
    where: Prisma.CommentsWhereUniqueInput;
    data: Prisma.CommentsUpdateInput;
  }): Promise<Comments> {
    const { data, where } = params;
    return this.prismaService.comments.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.CommentsWhereUniqueInput): Promise<Comments> {
    return this.prismaService.comments.delete({
      where,
    });
  }
}
