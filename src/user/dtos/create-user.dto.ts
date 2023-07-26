import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'user login',
    example: 'johndoe',
  })
  @IsNotEmpty()
  @IsString()
  login = '';

  @ApiProperty({
    description: 'user password',
    example: 'abracadabra',
  })
  @IsNotEmpty()
  @IsString()
  password = '';
}
