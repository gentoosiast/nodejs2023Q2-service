import { ApiProperty } from '@nestjs/swagger';
import { Artist } from '@artist/interfaces/artist.interface';
import {
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';
import { UUID_VERSION } from '@shared/constants/uuid';

export class ArtistResponseDto implements Artist {
  @ApiProperty({
    description: 'artist ID (uuid v4)',
    example: '3606733e-3bea-489c-a045-afa6e63ac0b3',
  })
  @IsNotEmpty()
  @IsUUID(UUID_VERSION)
  id: string;

  @ApiProperty({
    description: 'artist name',
    example: 'Björk',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Does artist have Grammy awards?',
    example: true,
  })
  @IsDefined()
  @IsBoolean()
  grammy: boolean;
}
