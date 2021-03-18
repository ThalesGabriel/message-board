import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { AuthModule } from 'src/adapters/auth/auth.module';
import { EncryptModule } from 'src/adapters/encrypt/encrypt.module';
import { JwtModule } from '@nestjs/jwt';
// import { jwtConstants } from 'src/adapters/auth/implementation/nest-jwt/constants';
import { AuthService } from 'src/adapters/auth/auth.service';
// import { JwtImplementationService } from 'src/adapters/auth/implementation/nest-jwt/jwt-implementation.service';
import { UserModule } from 'src/repo/user/user.module';
import { jwtConstants } from 'src/adapters/auth/constants';

@Module({
  imports: [
    UserModule, 
    EncryptModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [ProfileController],
  providers: [AuthService, ProfileService]
})
export class ProfileModule {}
