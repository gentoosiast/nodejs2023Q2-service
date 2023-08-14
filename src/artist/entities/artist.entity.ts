import { Artist } from '@artist/interfaces/artist.interface';

export class ArtistEntity implements Artist {
  id: string;
  name: string;
  grammy: boolean;
}
