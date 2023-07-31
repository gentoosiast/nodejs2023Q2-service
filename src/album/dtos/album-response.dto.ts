import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { Album } from '@album/interfaces/album.interface';
import { UUID_VERSION } from '@shared/constants/uuid';

export class AlbumResponseDto implements Album {
  @ApiProperty({
    description: 'album ID (uuid v4)',
    example: '51699c8f-26a0-493e-be62-8fe9d07c5a40',
  })
  @IsNotEmpty()
  @IsUUID(UUID_VERSION)
  id: string;

  @ApiProperty({
    description: 'album name',
    example: 'Cropping the Aftermath',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'album year',
    example: 2020,
  })
  @IsDefined()
  @IsInt()
  @IsPositive()
  year: number;

  @ApiProperty({
    description: 'ID of the artist who created this album (or null)',
    example: '48d89280-a918-4de6-8141-c34e9cf6283e',
  })
  @IsUUID(UUID_VERSION, { message: 'artistId must be a UUID or null' })
  @ValidateIf((_, value) => value !== null)
  artistId: string | null;
}
