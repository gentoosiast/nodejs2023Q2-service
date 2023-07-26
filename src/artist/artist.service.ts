import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { AlbumService } from '@album/album.service';
import { TrackService } from '@track/track.service';
import { UUIDService } from '@shared/services/uuid.service';
import { CreateArtistDto } from './dtos/create-artist.dto';
import { UpdateArtistInfoDto } from './dtos/update-artist-info.dto';
import { ArtistEntity } from './entities/artist.entity';
import { Artist } from './interfaces/artist.interface';

@Injectable()
export class ArtistService {
  private artistDb = new Map<string, Artist>(); // uuid v4, Artist
  constructor(
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
    private readonly uuidService: UUIDService,
  ) {}

  create(artistDto: CreateArtistDto): ArtistEntity {
    const artist: Artist = { ...artistDto, id: this.uuidService.generate() };
    this.artistDb.set(artist.id, artist);

    return plainToClass(ArtistEntity, artist);
  }

  findAll(): ArtistEntity[] {
    return [...this.artistDb.values()].map((artist) =>
      plainToClass(ArtistEntity, artist),
    );
  }

  findOne(id: string): ArtistEntity {
    const artist = this.artistDb.get(id);

    if (!artist) {
      return null;
    }

    return plainToClass(ArtistEntity, artist);
  }

  remove(id: string): boolean {
    if (this.artistDb.has(id)) {
      this.artistDb.delete(id);
      this.albumService.cleanupAfterArtistDeletion(id);
      this.trackService.cleanupAfterArtistDeletion(id);
      return true;
    }

    return false;
  }

  updateInfo(id: string, artistDto: UpdateArtistInfoDto): ArtistEntity | null {
    const artist = this.artistDb.get(id);

    if (!artist) {
      return null;
    }

    const updatedArtist: Artist = {
      ...artist,
      ...artistDto,
    };

    this.artistDb.set(artist.id, updatedArtist);

    return plainToClass(ArtistEntity, updatedArtist);
  }
}
