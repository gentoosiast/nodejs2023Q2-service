import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { FavsService } from '@favs/favs.service';
import { InMemoryDbService } from '@shared/services/storage.service';
import { UUIDService } from '@shared/services/uuid.service';
import { CreateTrackDto } from './dtos/create-track.dto';
import { UpdateTrackInfoDto } from './dtos/update-track-info.dto';
import { TrackEntity } from './entities/track.entity';
import { Track } from './interfaces/track.interface';
import { UnknownIdException } from '@shared/exceptions/unknown-id.exception';

@Injectable()
export class TrackService {
  constructor(
    private readonly favsService: FavsService,
    private readonly inMemoryDbService: InMemoryDbService,
    private readonly uuidService: UUIDService,
  ) {}

  create(trackDto: CreateTrackDto): TrackEntity {
    if (
      trackDto.artistId &&
      !this.inMemoryDbService.artists.has(trackDto.artistId)
    ) {
      throw new UnknownIdException('artistId');
    }

    if (
      trackDto.albumId &&
      !this.inMemoryDbService.albums.has(trackDto.albumId)
    ) {
      throw new UnknownIdException('albumId');
    }

    const track: Track = { ...trackDto, id: this.uuidService.generate() };
    this.inMemoryDbService.tracks.add(track.id, track);

    return plainToClass(TrackEntity, track);
  }

  findAll(): TrackEntity[] {
    const tracks = this.inMemoryDbService.tracks.findAll();

    return tracks.map((track) => plainToClass(TrackEntity, track));
  }

  findOne(id: string): TrackEntity | null {
    const track = this.inMemoryDbService.tracks.findOne(id);

    if (!track) {
      return null;
    }

    return plainToClass(TrackEntity, track);
  }

  findMany(ids: string[]): TrackEntity[] {
    const tracks = this.inMemoryDbService.tracks.findMany(ids);

    return tracks.map((track) => plainToClass(TrackEntity, track));
  }

  handleAlbumRemoval(id: string): void {
    this.inMemoryDbService.tracks.forEach((track) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
    });
  }

  handleArtistRemoval(id: string): void {
    this.inMemoryDbService.tracks.forEach((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
    });
  }

  isExists(id: string): boolean {
    return this.inMemoryDbService.tracks.has(id);
  }

  remove(id: string): boolean {
    this.favsService.removeTrack(id);

    return this.inMemoryDbService.tracks.delete(id);
  }

  updateInfo(id: string, trackDto: UpdateTrackInfoDto): TrackEntity | null {
    if (
      trackDto.artistId &&
      !this.inMemoryDbService.artists.has(trackDto.artistId)
    ) {
      throw new UnknownIdException('artistId');
    }

    if (
      trackDto.albumId &&
      !this.inMemoryDbService.albums.has(trackDto.albumId)
    ) {
      throw new UnknownIdException('albumId');
    }

    const track = this.inMemoryDbService.tracks.findOne(id);

    if (!track) {
      return null;
    }

    const updatedTrack: Track = {
      ...track,
      ...trackDto,
    };

    this.inMemoryDbService.tracks.add(track.id, updatedTrack);

    return plainToClass(TrackEntity, updatedTrack);
  }
}
