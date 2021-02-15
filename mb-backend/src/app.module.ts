import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './repo/user/user.module';
import { PostModule } from './repo/post/post.module';
import { AuthModule } from './adapters/auth/auth.module';

@Module({
  imports: [PrismaModule, UserModule, PostModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
