import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { UserService } from '@user/user.service';
import { CreateUserDto } from '@user/dtos/create-user.dto';
import { UserEntity } from '@user/entities/user.entity';
import { LoginResponseDto } from './dtos/login-response.dto';
import { EnvironmentVariables } from '@shared/intefaces/env-config';
import {
  DEFAULT_TOKEN_EXPIRE_TIME,
  DEFAULT_TOKEN_REFRESH_EXPIRE_TIME,
} from './constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
    private readonly userService: UserService,
  ) {}

  async signup(signupUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.userService.create(signupUserDto);
  }

  async login({ login, password }: CreateUserDto): Promise<LoginResponseDto> {
    const user = await this.userService.findOneByLogin(login);

    if (!user) {
      return null;
    }

    const isPasswordCorrect = await this.userService.verifyPassword(
      user.id,
      password,
    );

    if (!isPasswordCorrect) {
      return null;
    }

    const accessExpireTime = this.configService.get(
      'TOKEN_EXPIRE_TIME',
      DEFAULT_TOKEN_EXPIRE_TIME,
      { infer: true },
    );
    const refreshExpireTime = this.configService.get(
      'TOKEN_REFRESH_EXPIRE_TIME',
      DEFAULT_TOKEN_REFRESH_EXPIRE_TIME,
      { infer: true },
    );
    const accessSecret = this.configService.get('JWT_SECRET_KEY', {
      infer: true,
    });
    if (!accessSecret) {
      throw new Error('JWT_SECRET_KEY not found in environment');
    }

    const refreshSecret = this.configService.get('JWT_SECRET_REFRESH_KEY', {
      infer: true,
    });
    if (!refreshSecret) {
      throw new Error('JWT_SECRET_REFRESH_KEY not found in environment');
    }

    const accessTokenPromise = this.createJWTSignPromise(
      { sub: user.id },
      accessSecret,
      accessExpireTime,
    );
    const refreshTokenPromise = this.createJWTSignPromise(
      { sub: user.id },
      refreshSecret,
      refreshExpireTime,
    );

    const [accessToken, refreshToken] = await Promise.all([
      accessTokenPromise,
      refreshTokenPromise,
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async createJWTSignPromise(
    payload: string | Buffer | object,
    secret: jwt.Secret,
    expiresIn: number | string,
  ): Promise<string> {
    return new Promise((res, rej) => {
      jwt.sign(payload, secret, { expiresIn }, (err, token) => {
        if (err) {
          rej(err);
        }

        res(token);
      });
    });
  }
}
