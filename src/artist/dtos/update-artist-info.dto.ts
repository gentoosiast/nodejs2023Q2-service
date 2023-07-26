import { ApiProperty } from '@nestjs/swagger';
import { Artist } from '@artist/interfaces/artist.interface';
import { IsBoolean, IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class UpdateArtistInfoDto implements Omit<Artist, 'id'> {
  @ApiProperty({
    description: 'artist name',
    example: 'Harry Styles',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Does artist have Grammy awards?',
    example: false,
  })
  @IsDefined()
  @IsBoolean()
  grammy: boolean;
}
