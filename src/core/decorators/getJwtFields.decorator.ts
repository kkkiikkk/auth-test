import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { IJwtPayload } from "../interfaces";

export const GetSessionId = createParamDecorator(
  (data: keyof IJwtPayload | undefined, context: ExecutionContext): string => {
    const request = context.switchToHttp().getRequest();
    return request.user.sessionId;
  }
);

export const GetEmail = createParamDecorator(
  (data: keyof IJwtPayload | undefined, context: ExecutionContext): string => {
    const request = context.switchToHttp().getRequest();
    return request.user.email;
  }
);
