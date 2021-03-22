import { Injectable } from '@nestjs/common';
import { Media, Prisma } from '@prisma/client';
import { IMediaInterface } from 'src/interfaces/IMediaInterface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MediaService implements IMediaInterface {
    constructor(private readonly prismaService: PrismaService) {}

    async create(
        data: Prisma.MediaCreateInput,
      ): Promise<Media | null> {
        return this.prismaService.media.create({ data })
    }

    async update(params: {
      where: Prisma.MediaWhereUniqueInput;
      data: Prisma.MediaUpdateInput;
    }): Promise<Media> {
      const { where, data } = params;
      return this.prismaService.media.update({
        data,
        where,
      });
    }
}
