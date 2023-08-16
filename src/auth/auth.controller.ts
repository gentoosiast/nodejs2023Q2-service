import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from '@user/dtos/create-user.dto';
import { UserResponseDto } from '@user/dtos/user-response.dto';
import { UserEntity } from '@user/entities/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
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
  async login() {}

  @Post('refresh')
  async refresh() {}
}
