import { Prisma, File } from "@prisma/client";

export interface IFileInterface {
    create(data: Prisma.FileCreateInput): Promise<File>;
}