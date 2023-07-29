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
import { Track } from '@track/interfaces/track.interface';
import { UUID_VERSION } from '@shared/constants/uuid';

export class TrackResponseDto implements Track {
  @ApiProperty({
    description: 'track ID (uuid v4)',
    example: 'c81e086c-2cd9-4a9f-a68e-fa6c92214d52',
  })
  @IsNotEmpty()
  @IsUUID(UUID_VERSION)
  id: string;

  @ApiProperty({
    description: 'track name',
    example: 'Ghost Identifier',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'ID of the artist who created this track',
    example: '82e5e3a7-5f9a-4de4-9bfd-1398d3c0571e',
  })
  @IsUUID(UUID_VERSION, { message: 'artistId must be a UUID or null' })
  @ValidateIf((_, value) => value !== null)
  artistId: string | null;

  @ApiProperty({
    description: 'ID of the album this track belongs to',
    example: '48d83402-b63c-4d23-abdf-43094e0d05b9',
  })
  @IsUUID(UUID_VERSION, { message: 'albumId must be a UUID or null' })
  @ValidateIf((_, value) => value !== null)
  albumId: string | null;

  @ApiProperty({
    description: 'track duration in seconds',
    example: 353,
  })
  @IsDefined()
  @IsInt()
  @IsPositive()
  duration: number;
}
