import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { User } from '@user/interfaces/user.interface';
import { UUID_VERSION } from '@shared/constants/uuid';

export class UserResponseDto implements Omit<User, 'password'> {
  @ApiProperty({
    description: 'user ID (uuid v4)',
    example: '83ef2c0c-967e-46bb-b748-6614bc99b7b4',
  })
  @IsNotEmpty()
  @IsUUID(UUID_VERSION)
  id: string;

  @ApiProperty({
    description: 'user login',
    example: 'johndoe',
  })
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty({
    description: 'user version (integer number, increments on update)',
    example: 1,
  })
  @IsDefined()
  @IsInt()
  @IsPositive()
  version: number;

  @ApiProperty({
    description: 'timestamp of user creation',
    example: 1690366188813,
  })
  @IsDefined()
  @IsDate()
  createdAt: number;

  @ApiProperty({
    description: 'timestamp of last user update',
    example: 1690366221355,
  })
  @IsDefined()
  @IsDate()
  updatedAt: number;
}
