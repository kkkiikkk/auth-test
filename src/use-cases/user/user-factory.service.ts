import { Injectable } from "@nestjs/common";
import { User } from "../../core/entities";
import { CreateUserDto, UpdateUserDto } from "../../core/dtos/user.dto";

@Injectable()
export class UserFactoryService {
  createNewUser(createUserDto: CreateUserDto) {
    const newUser = new User();
    newUser.firstName = createUserDto.firstName;
    newUser.lastName = createUserDto.lastName;
    newUser.email = createUserDto.email;
    newUser.username = createUserDto.username;
    newUser.password = createUserDto.password;

    return newUser;
  }

  updateUser(updateUserDto: UpdateUserDto) {
    const newUser = new User();
    newUser.firstName = updateUserDto.firstName;
    newUser.lastName = updateUserDto.lastName;
    newUser.email = updateUserDto.email;
    newUser.username = updateUserDto.username;
    newUser.password = updateUserDto.password;

    return newUser;
  }
}
