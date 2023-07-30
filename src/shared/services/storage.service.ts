import { Injectable } from '@nestjs/common';
import { Database } from '@shared/libs/db';
import { Album } from '@album/interfaces/album.interface';
import { Artist } from '@artist/interfaces/artist.interface';
import { Track } from '@track/interfaces/track.interface';
import { User } from '@user/interfaces/user.interface';
import { Favorites } from '@favs/interfaces/favorites.interface';

@Injectable()
export class InMemoryDbService {
  albums = new Database<Album>();
  artists = new Database<Artist>();
  tracks = new Database<Track>();
  users = new Database<User>();
  favAlbums = new Set<string>();
  favArtists = new Set<string>();
  favTracks = new Set<string>();
  static instance: InMemoryDbService;

  constructor() {
    if (!!InMemoryDbService.instance) {
      return InMemoryDbService.instance;
    }

    InMemoryDbService.instance = this;

    return this;
  }

  getFavorites(): Favorites {
    const albums = [...this.favAlbums.values()];
    const artists = [...this.favArtists.values()];
    const tracks = [...this.favTracks.values()];

    return {
      albums,
      artists,
      tracks,
    };
  }
}
