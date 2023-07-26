import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { InMemoryDbService } from '@shared/services/storage.service';
import { UUIDService } from '@shared/services/uuid.service';
import { CreateArtistDto } from './dtos/create-artist.dto';
import { UpdateArtistInfoDto } from './dtos/update-artist-info.dto';
import { ArtistEntity } from './entities/artist.entity';
import { Artist } from './interfaces/artist.interface';

@Injectable()
export class ArtistService {
  constructor(
    private readonly inMemoryDbService: InMemoryDbService,
    private readonly uuidService: UUIDService,
  ) {}

  create(artistDto: CreateArtistDto): ArtistEntity {
    const artist: Artist = { ...artistDto, id: this.uuidService.generate() };
    this.inMemoryDbService.artists.add(artist.id, artist);

    return plainToClass(ArtistEntity, artist);
  }

  findAll(): ArtistEntity[] {
    const artists = this.inMemoryDbService.artists.findAll();

    return artists.map((artist) => plainToClass(ArtistEntity, artist));
  }

  findOne(id: string): ArtistEntity | null {
    const artist = this.inMemoryDbService.artists.findOne(id);

    if (!artist) {
      return null;
    }

    return plainToClass(ArtistEntity, artist);
  }

  findMany(ids: string[]): ArtistEntity[] {
    const artists = this.inMemoryDbService.artists.findMany(ids);

    return artists.map((artist) => plainToClass(ArtistEntity, artist));
  }

  isExists(id: string): boolean {
    return this.inMemoryDbService.artists.has(id);
  }

  remove(id: string): boolean {
    if (this.inMemoryDbService.artists.has(id)) {
      this.inMemoryDbService.artists.delete(id);
      this.inMemoryDbService.favArtists.delete(id);
      this.inMemoryDbService.albums.forEach((album) => {
        if (album.artistId === id) {
          album.artistId = null;
        }
      });
      this.inMemoryDbService.tracks.forEach((track) => {
        if (track.artistId === id) {
          track.artistId = null;
        }
      });

      return true;
    }

    return false;
  }

  updateInfo(id: string, artistDto: UpdateArtistInfoDto): ArtistEntity | null {
    const artist = this.inMemoryDbService.artists.findOne(id);

    if (!artist) {
      return null;
    }

    const updatedArtist: Artist = {
      ...artist,
      ...artistDto,
    };

    this.inMemoryDbService.artists.add(artist.id, updatedArtist);

    return plainToClass(ArtistEntity, updatedArtist);
  }
}
