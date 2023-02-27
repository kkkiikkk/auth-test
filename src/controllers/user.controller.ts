import {
  Controller,
  Get,
  Param,
  Body,
  Put,
  UseGuards,
  HttpStatus,
  HttpCode,
  UseInterceptors,
  CacheInterceptor,
  CacheTTL,
  CacheKey,
  Delete,
} from "@nestjs/common";
import { AccessGuard } from "../core/guards";
import { UpdateUserDto } from "../core/dtos/user.dto";
import { UserUseCases } from "../use-cases/user/user.use-case";

@Controller("api/user")
export class UserController {
  constructor(private userUseCases: UserUseCases) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @CacheKey("all-users")
  @UseGuards(AccessGuard)
  @HttpCode(HttpStatus.OK)
  async getAll() {
    return this.userUseCases.getAllUsers();
  }

  @Get(":id")
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @UseGuards(AccessGuard)
  @HttpCode(HttpStatus.OK)
  async getById(@Param("id") id: string) {
    return this.userUseCases.getUserById(id);
  }

  @Put(":id")
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @UseGuards(AccessGuard)
  @HttpCode(HttpStatus.OK)
  updateUser(
    @Param("id") userId: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userUseCases.updateUser(userId, updateUserDto);
  }

  @Delete(":id")
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @UseGuards(AccessGuard)
  @HttpCode(HttpStatus.OK)
  deleteUser(@Param("id") userId: string) {
    return this.userUseCases.deleteUser(userId);
  }
}
