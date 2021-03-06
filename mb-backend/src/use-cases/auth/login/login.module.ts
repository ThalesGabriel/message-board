import { Module } from '@nestjs/common';
import { AuthModule } from 'src/adapters/auth/auth.module';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
  imports: [AuthModule],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
