import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { UserResponseDto } from './dtos/user-response.dto';
import { UpdateUserPasswordError, UserService } from './user.service';
import { UUID_VERSION } from '@shared/constants/uuid';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Users have been successfully retrieved',
    type: UserResponseDto,
    isArray: true,
  })
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'user id (uuid v4)',
    example: 'e83cd69d-d1ef-4770-835e-5eb0537cc5c9',
    required: true,
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user has been successfully retrieved',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Provided user id is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User with provided id was not found',
  })
  async findOne(
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
  ) {
    const user = await this.userService.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The user has been successfully created',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Request body does not contain required fields',
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    description: 'user id (uuid v4)',
    example: 'e83cd69d-d1ef-4770-835e-5eb0537cc5c9',
    required: true,
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "User's password has been successfully updated",
    type: UserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Provided user id is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User with provided id was not found',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: "Provided user's password is wrong",
  })
  async updatePassword(
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const result = await this.userService.updatePassword(id, updatePasswordDto);

    if (result === UpdateUserPasswordError.UserNotFound) {
      throw new NotFoundException('User not found');
    }

    if (result === UpdateUserPasswordError.WrongPassword) {
      throw new ForbiddenException('Invalid password');
    }

    return result;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({
    name: 'id',
    description: 'user id (uuid v4)',
    example: 'e83cd69d-d1ef-4770-835e-5eb0537cc5c9',
    required: true,
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'User has been successfully deleted',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Provided user id is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User with provided id was not found',
  })
  async remove(
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
  ) {
    const result = await this.userService.remove(id);

    if (!result) {
      throw new NotFoundException('User not found');
    }
  }
}
