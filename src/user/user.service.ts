import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { PrismaService } from '@shared/services/prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { UserEntity } from './entities/user.entity';
import { Prisma } from '@prisma/client';

export enum UpdateUserPasswordError {
  WrongPassword,
  UserNotFound,
}

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.prismaService.user.create({
      data: userDto,
    });

    return plainToClass(UserEntity, user);
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.prismaService.user.findMany();

    return users.map((user) => plainToClass(UserEntity, user));
  }

  async findOne(id: string): Promise<UserEntity | null> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) {
      return null;
    }

    return plainToClass(UserEntity, user);
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.prismaService.user.delete({ where: { id } });

      return true;
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025' // record not found
      ) {
        return false;
      }

      throw err;
    }
  }

  async updatePassword(
    id: string,
    { oldPassword, newPassword }: UpdatePasswordDto,
  ): Promise<UserEntity | UpdateUserPasswordError> {
    const user = await this.prismaService.user.findUnique({ where: { id } });

    if (!user) {
      return UpdateUserPasswordError.UserNotFound;
    }

    if (user.password !== oldPassword) {
      return UpdateUserPasswordError.WrongPassword;
    }

    try {
      const updatedUser = await this.prismaService.user.update({
        where: { id },
        data: { version: user.version + 1, password: newPassword },
      });

      return plainToClass(UserEntity, updatedUser);
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025' // record not found
      ) {
        return UpdateUserPasswordError.UserNotFound;
      }

      throw err;
    }
  }
}
