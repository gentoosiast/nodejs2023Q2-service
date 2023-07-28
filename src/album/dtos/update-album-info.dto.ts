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

export class UpdateAlbumInfoDto implements Omit<Album, 'id'> {
  @ApiProperty({
    description: 'album name',
    example: 'Weathering',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'album year',
    example: 2011,
  })
  @IsDefined()
  @IsInt()
  @IsPositive()
  year: number;

  @ApiProperty({
    description: 'ID of the artist who created this album',
    example: '5f800c90-e1f0-483e-ab8d-1efff5f904e7',
  })
  @IsUUID('4', { message: 'artistId must be a UUID or null' })
  @ValidateIf((_, value) => value !== null)
  artistId: string | null; // refers to Artist
}