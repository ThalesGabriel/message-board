import { Injectable } from '@nestjs/common';
import { File, Prisma } from '@prisma/client';
import { IFileInterface } from 'src/interfaces/IFileInterface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FileService implements IFileInterface {
    constructor(private readonly prismaService: PrismaService) {}

    async create(
        data: Prisma.FileCreateInput,
      ): Promise<File | null> {
        return this.prismaService.file.create({ data })
    }
}
