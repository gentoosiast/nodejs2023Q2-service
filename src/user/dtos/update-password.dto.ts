import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({
    description: 'old password of the user',
    example: 'abracadabra',
  })
  @IsNotEmpty()
  @IsString()
  oldPassword = '';

  @ApiProperty({
    description: 'new password of the user',
    example: 'd@n*9QRe6KPE9uv7',
  })
  @IsNotEmpty()
  @IsString()
  newPassword = '';
}
