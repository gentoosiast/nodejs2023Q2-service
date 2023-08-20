import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { plainToClass } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@shared/services/prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { UserEntity } from './entities/user.entity';
import { EnvironmentVariables } from '@shared/intefaces/env-config';
import { DEFAULT_SALT_ROUNDS } from './constants';
import { UniqueConstraintException } from '@shared/exceptions/unique-constraint.exception';

export enum UpdateUserPasswordError {
  WrongPassword,
  UserNotFound,
}

@Injectable()
export class UserService {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
    private readonly prismaService: PrismaService,
  ) {}

  async create({ login, password }: CreateUserDto): Promise<UserEntity> {
    try {
      const saltRounds = +this.configService.get(
        'CRYPT_SALT',
        DEFAULT_SALT_ROUNDS,
        { infer: true },
      );
      const passwordHash = await bcrypt.hash(password, saltRounds);

      const user = await this.prismaService.user.create({
        data: { login, password: passwordHash },
      });

      return plainToClass(UserEntity, user);
    } catch (err) {
      console.log(JSON.stringify(err));
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2002'
      ) {
        throw new UniqueConstraintException(
          `User with login ${login} already exists`,
        );
      }
      throw err;
    }
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

  async findOneByLogin(login: string): Promise<UserEntity | null> {
    const user = await this.prismaService.user.findUnique({
      where: { login },
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

    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordCorrect) {
      return UpdateUserPasswordError.WrongPassword;
    }

    const saltRounds = +this.configService.get(
      'CRYPT_SALT',
      DEFAULT_SALT_ROUNDS,
      { infer: true },
    );
    const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);

    try {
      const updatedUser = await this.prismaService.user.update({
        where: { id },
        data: { version: user.version + 1, password: newPasswordHash },
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

  async verifyPassword(id: string, password: string): Promise<boolean> {
    const user = await this.prismaService.user.findUnique({ where: { id } });

    if (!user) {
      return false;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    return isPasswordCorrect;
  }
}
