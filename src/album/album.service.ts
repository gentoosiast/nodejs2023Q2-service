import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { UUIDService } from '@shared/services/uuid.service';
import { TrackService } from '@track/track.service';
import { CreateAlbumDto } from './dtos/create-album.dto';
import { UpdateAlbumInfoDto } from './dtos/update-album-info.dto';
import { AlbumEntity } from './entities/album.entity';
import { Album } from './interfaces/album.interface';

@Injectable()
export class AlbumService {
  private albumDb = new Map<string, Album>(); // uuid v4, Album
  static instance: AlbumService;

  constructor(
    private readonly trackService: TrackService,
    private readonly uuidService: UUIDService,
  ) {
    if (!!AlbumService.instance) {
      return AlbumService.instance;
    }

    AlbumService.instance = this;

    return this;
  }

  cleanupAfterArtistDeletion(artistId: string): void {
    this.albumDb.forEach((album) => {
      console.log(`album id: ${album.id}`);
      if (album.artistId === artistId) {
        album.artistId = null;
      }
    });
  }

  create(albumDto: CreateAlbumDto): AlbumEntity {
    const album: Album = { ...albumDto, id: this.uuidService.generate() };
    this.albumDb.set(album.id, album);

    return plainToClass(AlbumEntity, album);
  }

  findAll(): AlbumEntity[] {
    return [...this.albumDb.values()].map((album) =>
      plainToClass(AlbumEntity, album),
    );
  }

  findOne(id: string): AlbumEntity | null {
    const album = this.albumDb.get(id);

    if (!album) {
      return null;
    }

    return plainToClass(AlbumEntity, album);
  }

  remove(id: string): boolean {
    if (this.albumDb.has(id)) {
      this.albumDb.delete(id);
      this.trackService.cleanupAfterAlbumDeletion(id);
      return true;
    }

    return false;
  }

  updateInfo(id: string, albumDto: UpdateAlbumInfoDto): AlbumEntity | null {
    const album = this.albumDb.get(id);

    if (!album) {
      return null;
    }

    const updatedAlbum: Album = {
      ...album,
      ...albumDto,
    };

    this.albumDb.set(album.id, updatedAlbum);

    return plainToClass(AlbumEntity, updatedAlbum);
  }
}
