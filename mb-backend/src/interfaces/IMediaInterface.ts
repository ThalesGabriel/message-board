import { Media, Prisma } from "@prisma/client";

export interface IMediaInterface {
    create(data: Prisma.MediaCreateInput): Promise<Media | null>;
}