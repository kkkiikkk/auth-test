import { PartialType, PickType } from "@nestjs/mapped-types";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(16)
  password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class LoginUserDto extends PickType(CreateUserDto, [
  "email" as const,
  "password" as const,
]) {}
