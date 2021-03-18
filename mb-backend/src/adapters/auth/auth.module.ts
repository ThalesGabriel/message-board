import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/repo/user/user.module';
import { LoginModule } from 'src/use-cases/auth/login/login.module';
import { ProfileModule } from 'src/use-cases/auth/profile/profile.module';
import { EncryptModule } from '../encrypt/encrypt.module';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { LocalStrategy } from './implementation/passport/local.strategy';

@Module({
  imports: [
    LoginModule, 
    ProfileModule, 
    UserModule, 
    PassportModule, 
    EncryptModule, 
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    })
  ],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService, JwtModule]
})
export class AuthModule {}