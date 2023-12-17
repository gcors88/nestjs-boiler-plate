import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { Database } from 'src/providers/database/postgres/database';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);
  const port = config.get('NODE_PORT') || 3000;
  const database = app.get<Database>(Database);
  await database.createConnection();
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);
  console.log(`App running on port ${port}`);
}
bootstrap();
