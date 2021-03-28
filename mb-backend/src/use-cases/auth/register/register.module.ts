import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { AuthModule } from 'src/adapters/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [RegisterService],
  controllers: [RegisterController]
})
export class RegisterModule {}
