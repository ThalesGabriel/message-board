import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokenModule } from 'src/repo/refresh-token/refresh-token.module';
import { UserModule } from 'src/repo/user/user.module';
import { jwtConstants } from '../auth/constants';
import { TokensService } from './tokens.service';

@Module({
  imports: [
    RefreshTokenModule,
    UserModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '180s' },
    })
  ],
  providers: [TokensService],
  exports: [TokensService]
})
export class TokensModule {}
