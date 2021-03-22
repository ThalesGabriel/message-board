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
  ): Promise<any> {
    try {
      const { filename, mimetype, encoding, path } = data;

      const newFile = await this.fileService.create({
        filename,
        mimetype,
        encoding,
        path,
      });
      
      console.log(user)
      console.log(post)

      const newMedia = await this.mediaService.create({
        attachementId: {
          connect: { id: user.id},
        },
        post: {
          connect: { id: post.id },
        },
        file: {
          connect: { id: newFile.id },
        },
      });

      if(user.id) {
        await this.userService.update({
          where: { id: user.id },
          data: {
            avatar: {
              connect: {
                id: newMedia.id,
              },
            },
          },
        });
      }

      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }
}
