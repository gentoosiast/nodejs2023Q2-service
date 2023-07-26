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
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { UpdateUserPasswordError, UserService } from './user.service';
import { UUIDService } from '@shared/services/uuid.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly uuidService: UUIDService,
  ) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
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
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
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
