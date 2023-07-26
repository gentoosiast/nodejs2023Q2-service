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

export class CreateAlbumDto implements Omit<Album, 'id'> {
  @ApiProperty({
    description: 'album name',
    example: 'In the Days of Jupiter',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'album year',
    example: 2010,
  })
  @IsDefined()
  @IsInt()
  @IsPositive()
  year: number;

  @ApiProperty({
    description: 'ID of the artist who created this album',
    example: '2dd25d8d-21af-40b1-a273-1f06026fc618',
  })
  @IsUUID('4', { message: 'artistId must be a UUID or null' })
  @ValidateIf((_, value) => value !== null)
  artistId: string | null; // refers to Artist
}
