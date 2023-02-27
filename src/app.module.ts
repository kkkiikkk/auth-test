import { CacheModule, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import {
  authConfig,
  ConfigOptions,
  databaseConfig,
  serverConfig,
} from "./configuration";
import { MongoDataServicesModule } from "./frameworks/data-services/mongo/mongo-data-services.module";
import { UserUseCasesModule } from "./use-cases/user/user-use-cases.module";
import { AuthUseCasesModule } from "./use-cases/auth/auth-use-case.module";
import { UserController, AuthController } from "./controllers";
import type { RedisClientOptions } from "redis";
import { EventsModule } from "./websockets/event/event.module";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const redisStore = require("cache-manager-redis-store");

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, authConfig, serverConfig],
      validationOptions: ConfigOptions,
    }),
    CacheModule.register<RedisClientOptions>({
      isGlobal: true,
      store: redisStore,
      url: process.env.REDIS_URL,
    }),
    MongoDataServicesModule,
    UserUseCasesModule,
    AuthUseCasesModule,
    EventsModule,
  ],
  controllers: [UserController, AuthController],
  providers: [],
})
export class AppModule {}
