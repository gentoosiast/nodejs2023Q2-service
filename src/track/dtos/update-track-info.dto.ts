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

export class UpdateTrackInfoDto implements Omit<Track, 'id'> {
  @ApiProperty({
    description: 'track name',
    example: 'Mont Da Anaon',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'ID of the artist who created this track',
    example: '39dd467c-f47c-4387-a181-f5323fdf907d',
  })
  @IsUUID('4', { message: 'artistId must be a UUID or null' })
  @ValidateIf((_, value) => value !== null)
  artistId: string | null;

  @ApiProperty({
    description: 'ID of the album this track belongs to',
    example: 'ed42b070-738c-4c75-8acb-a7d79d537b38',
  })
  @IsUUID('4', { message: 'albumId must be a UUID or null' })
  @ValidateIf((_, value) => value !== null)
  albumId: string | null;

  @ApiProperty({
    description: 'track duration in seconds',
    example: 350,
  })
  @IsDefined()
  @IsInt()
  @IsPositive()
  duration: number;
}
