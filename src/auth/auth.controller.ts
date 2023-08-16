import {
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from '@user/dtos/create-user.dto';
import { LoginResponseDto } from './dtos/login-response.dto';
import { UserResponseDto } from '@user/dtos/user-response.dto';
import { UserEntity } from '@user/entities/user.entity';
import { SkipAuth } from '@shared/decorators/public';

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
  async login(@Body() loginUserDto: CreateUserDto): Promise<LoginResponseDto> {
    const response = await this.authService.login(loginUserDto);

    if (!response) {
      throw new ForbiddenException('Incorrect login or password');
    }

    return response;
  }

  @Post('refresh')
  @SkipAuth()
  async refresh() {}
}
