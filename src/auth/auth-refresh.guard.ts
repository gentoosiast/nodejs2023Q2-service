import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { EnvironmentVariables } from '@config/interfaces/env-config';

@Injectable()
export class AuthRefreshGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromBody(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const refreshSecret = this.configService.get('jwt.refreshSecret', {
        infer: true,
      });
      await this.jwtService.verifyAsync(token, {
        secret: refreshSecret,
      });
    } catch {
      throw new ForbiddenException();
    }
    return true;
  }

  private extractTokenFromBody(request: Request): string | undefined {
    const { refreshToken: token } = request.body;

    return token;
  }
}
