import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './repo/user/user.module';
import { PostModule } from './repo/post/post.module';
import { AuthModule } from './adapters/auth/auth.module';
import { MailModule } from './adapters/mail/mail.module';
// import { LocalModule } from './src/adapters/auth/implementation/nest-jwt/strategy/local/local.module';

@Module({
  imports: [PrismaModule, UserModule, PostModule, AuthModule, MailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
