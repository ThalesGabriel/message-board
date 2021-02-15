import { forwardRef, Module } from '@nestjs/common';
import { LoginModule } from 'src/use-cases/auth/login/login.module';
import { ProfileModule } from 'src/use-cases/auth/profile/profile.module';
import { JwtImplementationModule } from './implementation/jwt-implementation.module';

@Module({
  imports: [LoginModule, ProfileModule],
  providers: [JwtImplementationModule],
  exports: [JwtImplementationModule]
})
export class AuthModule {}