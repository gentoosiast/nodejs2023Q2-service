import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { UserService } from '@user/user.service';
import { CreateUserDto } from '@user/dtos/create-user.dto';
import { UserEntity } from '@user/entities/user.entity';
import { LoginResponseDto } from './dtos/login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
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

    const accessSecret = this.configService.get<string>('JWT_SECRET_KEY');
    const accessExpireTime =
      this.configService.get<string>('TOKEN_EXPIRE_TIME');
    const refreshSecret = this.configService.get<string>(
      'JWT_SECRET_REFRESH_KEY',
    );
    const refreshExpireTime = this.configService.get<string>(
      'TOKEN_REFRESH_EXPIRE_TIME',
    );

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
