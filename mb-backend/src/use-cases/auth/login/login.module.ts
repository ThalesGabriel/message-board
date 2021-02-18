import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/adapters/auth/auth.service';
import { jwtConstants } from 'src/adapters/auth/implementation/nest-jwt/constants';
import { JwtImplementationService } from 'src/adapters/auth/implementation/nest-jwt/jwt-implementation.service';
import { EncryptModule } from 'src/adapters/encrypt/encrypt.module';
import { UserModule } from 'src/repo/user/user.module';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
  imports: [UserModule, EncryptModule, JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '60s' },
  }),],
  controllers: [LoginController],
  providers: [AuthService, JwtImplementationService, LoginService],
})
export class LoginModule {}
