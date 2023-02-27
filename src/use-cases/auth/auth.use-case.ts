import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { User } from "../../core/entities";
import { IDataServices } from "../../core/abstracts";
import { CreateUserDto, LoginUserDto } from "../../core/dtos/user.dto";
import { UserFactoryService } from "../user/user-factory.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { ENV } from "../../utils";
import { IJwtPayload, ITokens } from "../../core/interfaces";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthUseCases {
  private readonly JwtAccessExpireTime = "10m";

  private readonly JwtRefreshExpireTime = "25m";

  constructor(
    private dataServices: IDataServices,
    private userFactoryService: UserFactoryService,
    private jwt: JwtService,
    private config: ConfigService
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    if (await this.dataServices.users.getBy({ email: createUserDto.email })) {
      throw new BadRequestException("User is taken");
    }
    const user = this.userFactoryService.createNewUser(createUserDto);
    return this.dataServices.users.create(user);
  }

  async login(loginUserDto: LoginUserDto): Promise<ITokens> {
    const user = await this.dataServices.users.getBy({
      email: loginUserDto.email,
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    if (!(await bcrypt.compare(loginUserDto.password, user.password))) {
      throw new UnauthorizedException("Invalid password entered");
    }
    const session = await this.dataServices.sessions.create({ user });
    const tokens = await this.generateTokens({
      email: user.email,
      sessionId: session._id,
    });

    return tokens;
  }

  async refresh(email: string, sessionId: string): Promise<ITokens> {
    const session = await this.dataServices.sessions.getById(sessionId);

    if (!session) {
      throw new ForbiddenException("Session not found");
    }

    const user = await this.dataServices.users.getById(session.user as string);

    if (user.email !== email) {
      throw new ForbiddenException("Access id denied");
    }

    await this.dataServices.sessions.deleteById(sessionId);

    const newSession = await this.dataServices.sessions.create({ user });
    const tokens = await this.generateTokens({
      email: user.email,
      sessionId: newSession._id,
    });

    return tokens;
  }

  async logout(sessionId: string) {
    const session = await this.dataServices.sessions.getById(sessionId);

    if (!session) {
      throw new ForbiddenException("Access id denied");
    }

    await this.dataServices.sessions.deleteById(sessionId);
    return {};
  }

  private async generateTokens(payload: IJwtPayload): Promise<ITokens> {
    const [access_token, refresh_token] = await Promise.all([
      this.jwt.signAsync(payload, {
        secret: this.config.get<string>(ENV[ENV.ACCESS]),
        expiresIn: this.JwtAccessExpireTime,
      }),
      this.jwt.signAsync(payload, {
        secret: this.config.get<string>(ENV[ENV.REFRESH]),
        expiresIn: this.JwtRefreshExpireTime,
      }),
    ]);

    return {
      access_token,
      refresh_token,
    };
  }
}
