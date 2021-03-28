import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/repo/user/user.module';
import { EncryptModule } from '../encrypt/encrypt.module';
import { MailModule } from '../mail/mail.module';
import { TokensModule } from '../tokens/tokens.module';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './implementation/passport/jwt.strategy';
import { LocalStrategy } from './implementation/passport/local.strategy';

@Module({
  imports: [
    UserModule, 
    PassportModule, 
    MailModule,
    TokensModule,
    EncryptModule, 
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '180s' },
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}