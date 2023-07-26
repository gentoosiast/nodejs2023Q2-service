import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { UserResponseDto } from './dtos/user-response.dto';
import { UpdateUserPasswordError, UserService } from './user.service';
import { UUIDService } from '@shared/services/uuid.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly uuidService: UUIDService,
  ) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Users have been successfully retrieved',
    type: UserResponseDto,
    isArray: true,
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiQuery({
    name: 'id',
    description: 'user id (uuid v4)',
    example: 'e83cd69d-d1ef-4770-835e-5eb0537cc5c9',
  })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully retrieved',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Provided userId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'User with provided userId was not found',
  })
  findOne(@Param('id') id: string) {
    if (!this.uuidService.validate(id)) {
      throw new BadRequestException('Invalid UUID');
    }

    const user = this.userService.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Request body does not contain required fields',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  @ApiQuery({
    name: 'id',
    description: 'user id (uuid v4)',
    example: 'e83cd69d-d1ef-4770-835e-5eb0537cc5c9',
  })
  @ApiResponse({
    status: 200,
    description: "User's password has been successfully updated",
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Provided userId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'User with provided userId was not found',
  })
  @ApiResponse({
    status: 403,
    description: "Provided user's password is wrong",
  })
  updatePassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    if (!this.uuidService.validate(id)) {
      throw new BadRequestException('Invalid UUID');
    }

    const result = this.userService.updatePassword(id, updatePasswordDto);

    if (result === UpdateUserPasswordError.UserNotFound) {
      throw new NotFoundException('User not found');
    }

    if (result === UpdateUserPasswordError.WrongPassword) {
      throw new ForbiddenException('Invalid password');
    }

    return result;
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiQuery({
    name: 'id',
    description: 'user id (uuid v4)',
    example: 'e83cd69d-d1ef-4770-835e-5eb0537cc5c9',
  })
  @ApiResponse({
    status: 204,
    description: 'User has been successfully deleted',
  })
  @ApiResponse({
    status: 400,
    description: 'Provided userId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'User with provided userId was not found',
  })
  remove(@Param('id') id: string) {
    if (!this.uuidService.validate(id)) {
      throw new BadRequestException('Invalid UUID');
    }

    const result = this.userService.remove(id);

    if (!result) {
      throw new NotFoundException('User not found');
    }
  }
}
