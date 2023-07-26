import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { InMemoryDbService } from '@shared/services/storage.service';
import { UUIDService } from '@shared/services/uuid.service';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { UserEntity } from './entities/user.entity';

export enum UpdateUserPasswordError {
  WrongPassword,
  UserNotFound,
}

@Injectable()
export class UserService {
  constructor(
    private readonly inMemoryDbService: InMemoryDbService,
    private readonly uuidService: UUIDService,
  ) {}

  create(userDto: CreateUserDto): UserEntity {
    const date = new Date().getTime();
    const user: User = {
      id: this.uuidService.generate(),
      ...userDto,
      version: 1,
      createdAt: date,
      updatedAt: date,
    };
    this.inMemoryDbService.users.add(user.id, user);

    return plainToClass(UserEntity, user);
  }

  findAll(): UserEntity[] {
    const users = this.inMemoryDbService.users.findAll();

    return users.map((user) => plainToClass(UserEntity, user));
  }

  findOne(id: string): UserEntity | null {
    const user = this.inMemoryDbService.users.findOne(id);

    if (!user) {
      return null;
    }

    return plainToClass(UserEntity, user);
  }

  remove(id: string): boolean {
    return this.inMemoryDbService.users.delete(id);
  }

  updatePassword(
    id: string,
    { oldPassword, newPassword }: UpdatePasswordDto,
  ): UserEntity | UpdateUserPasswordError {
    const user = this.inMemoryDbService.users.findOne(id);

    if (!user) {
      return UpdateUserPasswordError.UserNotFound;
    }

    if (user.password !== oldPassword) {
      return UpdateUserPasswordError.WrongPassword;
    }

    const updatedUser: User = {
      ...user,
      password: newPassword,
      updatedAt: new Date().getTime(),
      version: user.version + 1,
    };

    this.inMemoryDbService.users.add(id, updatedUser);

    return plainToClass(UserEntity, updatedUser);
  }
}
