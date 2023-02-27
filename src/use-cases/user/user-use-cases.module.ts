import { Module } from "@nestjs/common";
import { MongoDataServicesModule } from "../../frameworks/data-services/mongo/mongo-data-services.module";
import { UserFactoryService } from "./user-factory.service";
import { UserUseCases } from "./user.use-case";

@Module({
  imports: [MongoDataServicesModule],
  providers: [UserFactoryService, UserUseCases],
  exports: [UserFactoryService, UserUseCases],
})
export class UserUseCasesModule {}
