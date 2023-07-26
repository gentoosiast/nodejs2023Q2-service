import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  oldPassword = '';

  @IsNotEmpty()
  @IsString()
  newPassword = '';
}
