import { Module } from '@nestjs/common';
import { JwtImplementationService } from './jwt-implementation.service';

@Module({
  exports: [JwtImplementationService]
})
export class JwtImplementationModule {}
