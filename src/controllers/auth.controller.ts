import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpStatus,
  HttpCode,
} from "@nestjs/common";
import { GetEmail, GetSessionId } from "src/core/decorators";
import { RefreshGuard, AccessGuard } from "src/core/guards";
import { CreateUserDto, LoginUserDto } from "../core/dtos/user.dto";
import { AuthUseCases } from "../use-cases/auth/auth.use-case";

@Controller("api/auth")
export class AuthController {
  constructor(private authUseCases: AuthUseCases) {}

  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: CreateUserDto) {
    return this.authUseCases.register(registerDto);
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginUserDto) {
    return this.authUseCases.login(loginDto);
  }

  @Post("refresh")
  @UseGuards(RefreshGuard)
  @HttpCode(HttpStatus.OK)
  refresh(
    @GetSessionId()
    sessionId: string,
    @GetEmail()
    email: string
  ) {
    return this.authUseCases.refresh(email, sessionId);
  }

  @Post("logout")
  @UseGuards(AccessGuard)
  @HttpCode(HttpStatus.OK)
  logout(@GetSessionId() sessionId: string) {
    return this.authUseCases.logout(sessionId);
  }
}
