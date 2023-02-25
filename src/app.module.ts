// Core
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Configuration
import {
  authConfig,
  ConfigOptions,
  databaseConfig,
  serverConfig
} from './configuration';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, authConfig, serverConfig],
      validationOptions: ConfigOptions,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
