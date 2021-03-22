import { Prisma } from "@prisma/client";

export interface IUploadInterface {
    uploadFile(data: Prisma.MediaCreateInput): Promise<any>;
    uploadFiles(data: Prisma.MediaCreateInput[]): Promise<any>;
}
