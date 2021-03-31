import { Comments, Prisma } from "@prisma/client";

export interface ICommentsInterface {
  create(data: Prisma.CommentsCreateInput): Promise<Comments>;
  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CommentsWhereInput;
    where?: Prisma.CommentsWhereInput;
    orderBy?: Prisma.CommentsOrderByInput;
  }): Promise<Comments[]>;
  update(params: {
    where: Prisma.CommentsWhereUniqueInput;
    data: Prisma.CommentsUpdateInput;
  }): Promise<Comments>;
  delete(where: Prisma.CommentsWhereUniqueInput): Promise<Comments>;
}