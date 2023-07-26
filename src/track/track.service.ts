import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { UUIDService } from '@shared/services/uuid.service';
import { CreateTrackDto } from './dtos/create-track.dto';
import { UpdateTrackInfoDto } from './dtos/update-track-info.dto';
import { TrackEntity } from './entities/track.entity';
import { Track } from './interfaces/track.interface';

@Injectable()
export class TrackService {
  private trackDb = new Map<string, Track>();
  static instance: TrackService;

  constructor(private readonly uuidService: UUIDService) {
    if (!!TrackService.instance) {
      return TrackService.instance;
    }

    TrackService.instance = this;

    return this;
  }

  cleanupAfterAlbumDeletion(albumId: string): void {
    this.trackDb.forEach((track) => {
      if (track.albumId === albumId) {
        track.albumId = null;
      }
    });
  }

  cleanupAfterArtistDeletion(artistId: string): void {
    this.trackDb.forEach((track) => {
      if (track.artistId === artistId) {
        track.artistId = null;
      }
    });
  }

  create(trackDto: CreateTrackDto): TrackEntity {
    const track: Track = { ...trackDto, id: this.uuidService.generate() };
    this.trackDb.set(track.id, track);

    return plainToClass(TrackEntity, track);
  }

  findAll(): TrackEntity[] {
    return [...this.trackDb.values()].map((track) =>
      plainToClass(TrackEntity, track),
    );
  }

  findOne(id: string): TrackEntity {
    const track = this.trackDb.get(id);

    if (!track) {
      return null;
    }

    return plainToClass(TrackEntity, track);
  }

  remove(id: string): boolean {
    if (this.trackDb.has(id)) {
      this.trackDb.delete(id);
      return true;
    }

    return false;
  }

  updateInfo(id: string, trackDto: UpdateTrackInfoDto): TrackEntity | null {
    const track = this.trackDb.get(id);

    if (!track) {
      return null;
    }

    const updatedTrack: Track = {
      ...track,
      ...trackDto,
    };

    this.trackDb.set(track.id, updatedTrack);

    return plainToClass(TrackEntity, updatedTrack);
  }
}
