import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { UUIDService } from '@shared/services/uuid.service';
import { InMemoryDbService } from '@shared/services/storage.service';
import { CreateAlbumDto } from './dtos/create-album.dto';
import { UpdateAlbumInfoDto } from './dtos/update-album-info.dto';
import { AlbumEntity } from './entities/album.entity';
import { Album } from './interfaces/album.interface';
import { UnknownIdException } from '@shared/exceptions/unknown-id.exception';

@Injectable()
export class AlbumService {
  constructor(
    private readonly inMemoryDbService: InMemoryDbService,
    private readonly uuidService: UUIDService,
  ) {}

  create(albumDto: CreateAlbumDto): AlbumEntity {
    if (
      albumDto.artistId &&
      !this.inMemoryDbService.artists.has(albumDto.artistId)
    ) {
      throw new UnknownIdException('artistId');
    }

    const album: Album = { ...albumDto, id: this.uuidService.generate() };
    this.inMemoryDbService.albums.add(album.id, album);

    return plainToClass(AlbumEntity, album);
  }

  findAll(): AlbumEntity[] {
    const albums = this.inMemoryDbService.albums.findAll();

    return albums.map((album) => plainToClass(AlbumEntity, album));
  }

  findOne(id: string): AlbumEntity | null {
    const album = this.inMemoryDbService.albums.findOne(id);

    if (!album) {
      return null;
    }

    return plainToClass(AlbumEntity, album);
  }

  findMany(ids: string[]): AlbumEntity[] {
    const albums = this.inMemoryDbService.albums.findMany(ids);

    return albums.map((album) => plainToClass(AlbumEntity, album));
  }

  isExists(id: string): boolean {
    return this.inMemoryDbService.albums.has(id);
  }

  remove(id: string): boolean {
    if (this.inMemoryDbService.albums.has(id)) {
      this.inMemoryDbService.favAlbums.delete(id);
      this.inMemoryDbService.tracks.forEach((track) => {
        if (track.albumId === id) {
          track.albumId = null;
        }
      });

      return this.inMemoryDbService.albums.delete(id);
    }

    return false;
  }

  updateInfo(id: string, albumDto: UpdateAlbumInfoDto): AlbumEntity | null {
    if (
      albumDto.artistId &&
      !this.inMemoryDbService.artists.has(albumDto.artistId)
    ) {
      throw new UnknownIdException('artistId');
    }

    const album = this.inMemoryDbService.albums.findOne(id);

    if (!album) {
      return null;
    }

    const updatedAlbum: Album = {
      ...album,
      ...albumDto,
    };

    this.inMemoryDbService.albums.add(album.id, updatedAlbum);

    return plainToClass(AlbumEntity, updatedAlbum);
  }
}
