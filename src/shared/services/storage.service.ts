import { Injectable } from '@nestjs/common';
import { Database } from '@shared/libs/db';
import { Album } from '@album/interfaces/album.interface';
import { Artist } from '@artist/interfaces/artist.interface';
import { Track } from '@track/interfaces/track.interface';
import { User } from '@user/interfaces/user.interface';
import { FavsResponseDto } from '@favs/dtos/favs-response.dto';

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

  getFavorites(): FavsResponseDto {
    const albumIds = [...this.favAlbums.values()];
    const artistIds = [...this.favArtists.values()];
    const trackIds = [...this.favTracks.values()];

    return {
      albums: this.albums.findMany(albumIds),
      artists: this.artists.findMany(artistIds),
      tracks: this.tracks.findMany(trackIds),
    };
  }
}
