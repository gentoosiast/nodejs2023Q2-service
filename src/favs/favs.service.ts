import { Injectable } from '@nestjs/common';
import { InMemoryDbService } from '@shared/services/storage.service';
import { FavsResponseDto } from './dtos/favs-response.dto';

@Injectable()
export class FavsService {
  constructor(private inMemoryDbService: InMemoryDbService) {}

  addAlbum(id: string): boolean {
    if (!this.inMemoryDbService.albums.has(id)) {
      return false;
    }

    this.inMemoryDbService.favAlbums.add(id);

    return true;
  }

  addArtist(id: string): boolean {
    if (!this.inMemoryDbService.artists.has(id)) {
      return false;
    }

    this.inMemoryDbService.favArtists.add(id);

    return true;
  }

  addTrack(id: string): boolean {
    if (!this.inMemoryDbService.tracks.has(id)) {
      return false;
    }

    this.inMemoryDbService.favTracks.add(id);

    return true;
  }

  findAll(): FavsResponseDto {
    return this.inMemoryDbService.getFavorites();
  }

  removeAlbum(id: string): boolean {
    return this.inMemoryDbService.favAlbums.delete(id);
  }

  removeArtist(id: string): boolean {
    return this.inMemoryDbService.favArtists.delete(id);
  }

  removeTrack(id: string): boolean {
    return this.inMemoryDbService.favTracks.delete(id);
  }
}
