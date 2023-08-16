import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
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
    private readonly jwtService: JwtService,
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

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { userId: user.id, login: user.login },
        { secret: accessSecret, expiresIn: accessExpireTime },
      ),
      this.jwtService.signAsync(
        { userId: user.id, login: user.login },
        { secret: refreshSecret, expiresIn: refreshExpireTime },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
