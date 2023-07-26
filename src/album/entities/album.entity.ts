import { Album } from '@album/interfaces/album.interface';

export class AlbumEntity implements Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}
