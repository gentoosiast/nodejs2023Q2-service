import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@user/user.service';
import { CreateUserDto } from '@user/dtos/create-user.dto';
import { UserEntity } from '@user/entities/user.entity';
import { TokenResponseDto } from './dtos/token-response.dto';
import { EnvironmentVariables } from '@config/interfaces/env-config';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { TokenPayload } from './interfaces/token-payload';

interface JWTConfig {
  accessExpireTime: string | number;
  refreshExpireTime: string | number;
  accessSecret: string;
  refreshSecret: string;
}

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

  async login({
    login,
    password,
  }: CreateUserDto): Promise<TokenResponseDto | null> {
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

    const { accessSecret, refreshSecret, accessExpireTime, refreshExpireTime } =
      this.getJwtConfig();

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

  async refresh({
    refreshToken: providedRefreshToken,
  }: RefreshTokenDto): Promise<TokenResponseDto | null> {
    const { accessSecret, refreshSecret, accessExpireTime, refreshExpireTime } =
      this.getJwtConfig();
    let payload: TokenPayload | null = null;

    try {
      payload = await this.jwtService.verifyAsync<TokenPayload>(
        providedRefreshToken,
        {
          secret: refreshSecret,
        },
      );
    } catch {
      return null;
    }

    const user = await this.userService.findOne(payload.userId);

    if (!user) {
      return null;
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

    return { accessToken, refreshToken };
  }

  private getJwtConfig(): JWTConfig {
    const accessExpireTime = this.configService.get('jwt.accessExpire', {
      infer: true,
    });
    const refreshExpireTime = this.configService.get('jwt.refreshExpire', {
      infer: true,
    });
    const accessSecret = this.configService.get('jwt.accessSecret', {
      infer: true,
    });
    if (!accessSecret) {
      throw new Error('JWT_SECRET_KEY not found in environment');
    }
    const refreshSecret = this.configService.get('jwt.refreshSecret', {
      infer: true,
    });
    if (!refreshSecret) {
      throw new Error('JWT_SECRET_REFRESH_KEY not found in environment');
    }

    return {
      accessExpireTime,
      refreshExpireTime,
      accessSecret,
      refreshSecret,
    };
  }
}
