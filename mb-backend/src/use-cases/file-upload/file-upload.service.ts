import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import PostDto from 'src/domain/dto/post.dto';
import UserDto from 'src/domain/dto/user.dto';
import { IUploadInterface } from 'src/interfaces/IUploadInterface';
import { FileService } from 'src/repo/file/file.service';
import { MediaService } from 'src/repo/media/media.service';
import { PostService } from 'src/repo/post/post.service';
import { UserService } from 'src/repo/user/user.service';

interface Variables {
  attachedId: User;
}

@Injectable()
export class FileUploadService {
  constructor(
    private readonly fileService: FileService,
    private readonly mediaService: MediaService,
    private readonly userService: UserService,
  ) {}

  async create(
    data: Express.Multer.File,
    user: UserDto,
    post: PostDto,
  ): Promise<Express.Multer.File> {
    try {
      const { filename, mimetype, encoding, path } = data;

      const newFile = await this.fileService.create({
        filename,
        mimetype,
        encoding,
        path,
      });

      const newMedia = await this.mediaService.create({
        file: {
          connect: { id: newFile.id },
        },
      });

      if(1) {
        await this.mediaService.update({
          where: { id: newMedia.id },
          data: {
            attachementId: {
              connect: {
                id: 1,
              },
            },
          },
        })
        await this.userService.update({
          where: { id: 1 },
          data: {
            avatar: {
              connect: {
                id: newMedia.id,
              },
            },
          },
        });
      } else if (post.id) {
        await this.mediaService.update({
          where: { id: newMedia.id },
          data: {
            post: {
              connect: { id: post.id },
            },
          },
        })
      }

      return data
    } catch (error) {
      console.log(error)
      return null
    }
  }
}
