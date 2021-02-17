import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailtrapModule } from './implementation/mailtrap/mailtrap.module';

@Module({
  providers: [MailService],
  imports: [MailtrapModule]
})
export class MailModule {}
