import { Module } from '@nestjs/common';
import { EncryptService } from './encrypt.service';
import { BcryptService } from './implementation/bcrypt/bcrypt.service';

@Module({
  providers: [EncryptService, BcryptService],
  exports: [EncryptService, BcryptService]
})
export class EncryptModule {}
