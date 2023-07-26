import { Album } from '@album/interfaces/album.interface';

export class AlbumResponseDto implements Album {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}
