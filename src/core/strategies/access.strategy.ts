import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ENV, STRATEGY } from "../../utils";
import { IJwtPayload } from "../interfaces";

@Injectable()
export class AccessStrategy extends PassportStrategy(
  Strategy,
  STRATEGY.ACCESS
) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: <string>config.get(ENV[ENV.ACCESS]),
    });
  }

  validate(payload: IJwtPayload): IJwtPayload {
    return payload;
  }
}
