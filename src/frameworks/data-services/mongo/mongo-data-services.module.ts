import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { CallbackWithoutResultAndOptionalError } from "mongoose";
import { IDataServices } from "../../../core";
import { ENV } from "../../../utils";
import { Session, SessionSchema, User, UserSchema } from "./models";
import { MongoDataServices } from "./mongo-data-services.service";
import * as bcrypt from "bcrypt";

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          schema.pre(
            "save",
            async function (next: CallbackWithoutResultAndOptionalError) {
              try {
                if (!this.isModified("password")) {
                  return next();
                }

                const hashedPassword = await bcrypt.hash(this.password, 10);

                this.password = hashedPassword;

                return next();
              } catch (error) {
                return next(error);
              }
            }
          );
          return schema;
        },
      },
      {
        name: Session.name,
        useFactory: () => SessionSchema,
      },
    ]),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get(ENV[ENV.DATABASE_URL]),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: IDataServices,
      useClass: MongoDataServices,
    },
  ],
  exports: [IDataServices],
})
export class MongoDataServicesModule {}
