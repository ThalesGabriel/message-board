import { Module } from '@nestjs/common';
import { CreateUserService } from './create-user.service';
import { CreateUserController } from './create-user.controller';
import { UserService } from 'src/repo/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { EncryptService } from 'src/adapters/encrypt/encrypt.service';
import { EncryptModule } from 'src/adapters/encrypt/encrypt.module';
import { MailerModule } from 'nestjs-mailer';
import { MailService } from 'src/adapters/mail/mail.service';

@Module({
  imports: [EncryptModule, MailerModule.forRoot({
      config: {
        transport: {
          host: 'smtp.mailtrap.io',
          port: parseInt(process.env.MAILTRAP_PORT),
          secure: false,
          auth: {
            user: process.env.MAILTRAP_USER,
            pass: process.env.MAILTRAP_PASSWORD,
          }
        },
        defaults: {
          from: '"Equipe message board" <noreply@mb.com>',
        },
      },
    }),
  ],
  controllers: [CreateUserController],
  providers: [CreateUserService, UserService, PrismaService, EncryptModule, MailService]
})
export class CreateUserModule {}
