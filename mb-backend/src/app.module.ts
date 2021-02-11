import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './use-cases/user/user.module';

@Module({
  imports: [UserModule, GraphQLModule.forRoot({})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
