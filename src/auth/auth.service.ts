import { Injectable } from '@nestjs/common';
import { UserService } from '@user/user.service';
import { CreateUserDto } from '@user/dtos/create-user.dto';
import { UserEntity } from '@user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signup(signupUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.userService.create(signupUserDto);
  }
}
