import {
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from '@user/dtos/create-user.dto';
import { TokenResponseDto } from './dtos/token-response.dto';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { UserResponseDto } from '@user/dtos/user-response.dto';
import { UserEntity } from '@user/entities/user.entity';
import { SkipAuth } from '@shared/decorators/public';
import { AuthRefreshGuard } from './auth-refresh.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @SkipAuth()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The user has been successfully created',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Request body does not contain required fields',
  })
  async signup(@Body() signupUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.authService.signup(signupUserDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @SkipAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful login with provided login and password',
    type: TokenResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      'DTO is invalid (no login or password, or they are not a strings)',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Incorrect login or password',
  })
  async login(@Body() loginUserDto: CreateUserDto): Promise<TokenResponseDto> {
    const response = await this.authService.login(loginUserDto);

    if (!response) {
      throw new ForbiddenException('Incorrect login or password');
    }

    return response;
  }

  @Post('refresh')
  @UseGuards(AuthRefreshGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful refresh, new tokens issued',
    type: TokenResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description:
      'DTO is invalid (no refreshToken in body) or no refresh token in the Authorization header',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description:
      'Authentication failed (refresh token in the body is invalid or expired)',
  })
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    const response = await this.authService.refresh(refreshTokenDto);

    if (!response) {
      throw new ForbiddenException('Refresh token is invalid or expired');
    }

    return response;
  }
}
