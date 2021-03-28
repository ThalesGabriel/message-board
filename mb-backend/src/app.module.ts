import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './repo/user/user.module';
import { PostModule } from './repo/post/post.module';
import { AuthModule } from './adapters/auth/auth.module';
import { MailModule } from './adapters/mail/mail.module';
import { SocketioModule } from './adapters/socketio/socketio.module';
import { FileUploadModule } from './use-cases/file-upload/file-upload.module';
import { MediaModule } from './repo/media/media.module';
import { FileModule } from './repo/file/file.module';
import { RefreshTokenModule } from './repo/refresh-token/refresh-token.module';
import { TokensModule } from './adapters/tokens/tokens.module';
import { RegisterModule } from './use-cases/auth/register/register.module';
import { LoginModule } from './use-cases/auth/login/login.module';
import { ProfileModule } from './use-cases/auth/profile/profile.module';

@Module({
  imports: [
    UserModule,
    PostModule,
    AuthModule,
    FileUploadModule,
    RegisterModule,
    LoginModule,
    ProfileModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
