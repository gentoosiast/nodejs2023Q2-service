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

export class CreateTrackDto implements Omit<Track, 'id'> {
  @ApiProperty({
    description: 'track name',
    example: 'An Imperfect System',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'ID of the artist who created this track',
    example: 'd7733d90-6119-4347-95d2-ed85678a3e42',
  })
  @IsUUID('4', { message: 'artistId must be a UUID or null' })
  @ValidateIf((_, value) => value !== null)
  artistId: string | null;

  @ApiProperty({
    description: 'ID of the album this track belongs to',
    example: 'bbf3d2ef-ed3c-4c5b-b156-9d9f2264c5a0',
  })
  @IsUUID('4', { message: 'albumId must be a UUID or null' })
  @ValidateIf((_, value) => value !== null)
  albumId: string | null;

  @ApiProperty({
    description: 'track duration in seconds',
    example: 484,
  })
  @IsDefined()
  @IsInt()
  @IsPositive()
  duration: number;
}
