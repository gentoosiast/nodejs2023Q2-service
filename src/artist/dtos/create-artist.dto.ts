import { ApiProperty } from '@nestjs/swagger';
import { Artist } from '@artist/interfaces/artist.interface';
import { IsBoolean, IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistDto implements Omit<Artist, 'id'> {
  @ApiProperty({
    description: 'artist name',
    example: 'Moby',
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
