import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
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
  private userDb = new Map<string, User>(); // uuid v4, User

  constructor(private readonly uuidService: UUIDService) {}

  create(userDto: CreateUserDto): UserEntity {
    const date = new Date().getTime();
    const user: User = {
      id: this.uuidService.generate(),
      ...userDto,
      version: 1,
      createdAt: date,
      updatedAt: date,
    };
    this.userDb.set(user.id, user);

    return plainToClass(UserEntity, user);
  }

  findAll(): UserEntity[] {
    return [...this.userDb.values()].map((user) =>
      plainToClass(UserEntity, user),
    );
  }

  findOne(id: string): UserEntity | null {
    const user = this.userDb.get(id);

    if (!user) {
      return null;
    }

    return plainToClass(UserEntity, user);
  }

  remove(id: string): boolean {
    if (this.userDb.has(id)) {
      this.userDb.delete(id);
      return true;
    }

    return false;
  }

  updatePassword(
    id: string,
    { oldPassword, newPassword }: UpdatePasswordDto,
  ): UserEntity | UpdateUserPasswordError {
    const user = this.userDb.get(id);

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

    this.userDb.set(id, updatedUser);

    return plainToClass(UserEntity, updatedUser);
  }
}
