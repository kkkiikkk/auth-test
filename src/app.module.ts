import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  authConfig,
  ConfigOptions,
  databaseConfig,
  serverConfig
} from './configuration';
import { MongoDataServicesModule } from './frameworks/data-services/mongo/mongo-data-services.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, authConfig, serverConfig],
      validationOptions: ConfigOptions,
    }),
    MongoDataServicesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
