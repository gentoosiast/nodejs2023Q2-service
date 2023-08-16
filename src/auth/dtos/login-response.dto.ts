import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginResponseDto {
  @ApiProperty({
    description: 'JWT access token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzZmU4Y2VkNS1iNjc2LTQ1YTQtYWI5MC05ZGMwZjcyYjg0N2IiLCJpYXQiOjE2OTIxODI2MDUsImV4cCI6MTY5MjE4NjIwNX0.MvEHTBg1y1Vak4chpltrsxwqK7oCQcZYELD6EinIxWo',
  })
  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @ApiProperty({
    description: 'JWT refresh token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzZmU4Y2VkNS1iNjc2LTQ1YTQtYWI5MC05ZGMwZjcyYjg0N2IiLCJpYXQiOjE2OTIxODI2MDUsImV4cCI6MTY5MjI2OTAwNX0.LUgxkI_Yd1UggbCKiW8MoZu2G8k-376eR5Qasg7roSg',
  })
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
