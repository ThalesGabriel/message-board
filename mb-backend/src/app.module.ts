import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './use-cases/user/user.module';

@Module({
  imports: [GraphQLModule.forRoot({
    include: [ UserModule ]
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
