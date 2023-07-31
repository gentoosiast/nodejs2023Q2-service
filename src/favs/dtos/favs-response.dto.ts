import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { Album } from '@album/interfaces/album.interface';
import { Artist } from '@artist/interfaces/artist.interface';
import { Track } from '@track/interfaces/track.interface';

export class FavsResponseDto {
  @ApiProperty({
    description: 'List of favorite artists',
    example: [
      {
        id: '65088521-629d-4008-b8d5-b8e6369c5df7',
        name: 'Carbon Based Lifeforms',
        grammy: false,
      },
      {
        id: '1d232e76-dd4c-435a-9145-7368ae6dbad2',
        name: 'Gorillaz',
        grammy: true,
      },
    ],
  })
  @IsArray()
  artists: Artist[];

  @ApiProperty({
    description: 'List of favorite albums',
    example: [
      {
        id: 'e8c4f2c8-879a-43e2-b0a1-f149c7077194',
        name: 'Weathered',
        year: 2012,
        artistId: '4bb7f6e2-7b8c-450d-8636-09433144b3cd',
      },
      {
        id: 'b265bb37-782f-4313-808e-dd5e43fb8476',
        name: 'Everything Else Has Gone Wrong',
        year: 2020,
        artistId: 'f73494f7-e368-4d2a-a6e0-bac6b0216739',
      },
    ],
  })
  @IsArray()
  albums: Album[];

  @ApiProperty({
    description: 'List of favorite tracks',
    example: [
      {
        id: '1ee309c5-59cf-4932-8481-88a3f1708603',
        name: 'Nightcall',
        artistId: '46a07667-8470-4e94-a39e-291b4fd00f16',
        albumId: 'e379c5b4-9fad-4f47-b996-15551c320c07',
        duration: 258,
      },
      {
        id: '93d36579-1381-484e-9dec-6115e94e0bca',
        name: 'Home By Now',
        artistId: 'a6b10a11-e2db-4f43-8e38-b12d9c5fe73c',
        albumId: 'c383f3f8-cef8-4b89-8436-640dc8700ed7',
        duration: 275,
      },
      {
        id: 'b29e3a77-236d-40b8-90cf-581f70dc2886',
        name: 'Eat, Sleep, Wake (Nothing But You)',
        artistId: 'a7c4c51c-2463-484e-881b-2279bd5e75a2',
        albumId: '3441d199-0362-48cf-8b66-2a0940944092',
        duration: 220,
      },
    ],
  })
  @IsArray()
  tracks: Track[];
}
