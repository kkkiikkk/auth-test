// Core
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Utils
import { ENV } from './utils';

(async () => {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get(ENV[ENV.PORT]) ?? 3001;

  await app.listen(port);

  Logger.log(`Server running at http://localhost:${port}`, 'NestApplication');
})();
