import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  login = '';

  @IsNotEmpty()
  @IsString()
  password = '';
}
