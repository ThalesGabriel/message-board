import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as expressListRoutes from 'express-list-routes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3001);

  const server = app.getHttpServer();
  const router = server._events.request._router;
  console.log(expressListRoutes({}, 'API:', router));
}
bootstrap();
