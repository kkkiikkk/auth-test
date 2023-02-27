import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { User } from "../../core/entities";
import { IDataServices } from "../../core/abstracts";
import { UpdateUserDto } from "../../core/dtos/user.dto";
import { UserFactoryService } from "./user-factory.service";
import { Cache } from "cache-manager";

@Injectable()
export class UserUseCases {
  constructor(
    private dataServices: IDataServices,
    private userFactoryService: UserFactoryService,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache
  ) {}

  async getAllUsers(): Promise<User[]> {
    const cashedUsers: User[] = await this.cacheManager.get("all-users");
    if (cashedUsers) return cashedUsers;

    const users = await this.dataServices.users.getAll();
    await this.cacheManager.set("all-users", users, 30);

    return users;
  }

  async getUserById(id: string): Promise<User> {
    const cashedUser: User = await this.cacheManager.get(`user-${id}`);
    if (cashedUser) return cashedUser;

    const user = await this.dataServices.users.getById(id);

    if (!user) {
      throw new NotFoundException("User no found");
    }
    await this.cacheManager.set(`user-${id}`, user, 30);

    return user;
  }

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto
  ): Promise<User> {
    const user = this.userFactoryService.updateUser(updateUserDto);
    const updatedUser = await this.dataServices.users.update(userId, user);

    await this.cacheManager.set(`user-${userId}`, updatedUser, 30);
    return updatedUser;
  }

  async deleteUser(userId: string): Promise<void> {
    const user = await this.dataServices.users.getById(userId);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    await this.dataServices.users.deleteById(userId);
    await this.cacheManager.del(`user-${userId}`);
  }
}
