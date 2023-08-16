import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    description: 'JWT refresh token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjNmRjOWE1Zi1mMGM2LTQ2YzctODZhZC0yMTQwYjQzZDViN2IiLCJpYXQiOjE2OTIxOTkwMzcsImV4cCI6MTY5MjI4NTQzN30.bwlNClmODzRgLJcCSP0Zr4pjYlfHMgKIK5o7C_9CUeg',
  })
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
