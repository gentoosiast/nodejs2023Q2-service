import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { Album } from '@album/interfaces/album.interface';
import { Artist } from '@artist/interfaces/artist.interface';
import { Track } from '@track/interfaces/track.interface';

export class FavsResponseDto {
  @ApiProperty({
    description: 'List of favorite artists',
    example: [],
  })
  @IsArray()
  artists: Artist[];

  @ApiProperty({
    description: 'List of favorite albums',
    example: [],
  })
  @IsArray()
  albums: Album[];

  @ApiProperty({
    description: 'List of favorite tracks',
    example: [],
  })
  @IsArray()
  tracks: Track[];
}
