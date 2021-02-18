import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailtrapModule } from './implementation/mailtrap/mailtrap.module';
import { MailerModule } from 'nestjs-mailer';

@Module({
  providers: [MailService],
})
export class MailModule {}
