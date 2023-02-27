import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongoDataServicesModule } from "../../frameworks/data-services/mongo/mongo-data-services.module";
import { UserFactoryService } from "../user/user-factory.service";
import { AuthUseCases } from "./auth.use-case";
import { AccessStrategy, RefreshStrategy } from "../../core/strategies";
import { AccessGuard, RefreshGuard } from "../../core/guards";
@Module({
  imports: [MongoDataServicesModule, JwtModule.register({})],
  providers: [
    UserFactoryService,
    AuthUseCases,
    AccessStrategy,
    RefreshStrategy,
    AccessGuard,
    RefreshGuard,
  ],
  exports: [UserFactoryService, AuthUseCases],
})
export class AuthUseCasesModule {}
