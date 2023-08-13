import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@shared/services/prisma.service';
import { CreateTrackDto } from './dtos/create-track.dto';
import { UpdateTrackInfoDto } from './dtos/update-track-info.dto';
import { TrackEntity } from './entities/track.entity';
import { UnknownIdException } from '@shared/exceptions/unknown-id.exception';

@Injectable()
export class TrackService {
  constructor(private readonly prismaService: PrismaService) {}

  async create({
    name,
    duration,
    artistId,
    albumId,
  }: CreateTrackDto): Promise<TrackEntity> {
    try {
      const track = await this.prismaService.track.create({
        data: {
          name,
          duration,
          artist: artistId !== null ? { connect: { id: artistId } } : undefined,
          album: albumId !== null ? { connect: { id: albumId } } : undefined,
        },
      });

      return plainToClass(TrackEntity, track);
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025' && // "An operation failed because it depends on one or more records that were required but not found. {cause}"
        typeof err.meta.cause === 'string'
      ) {
        if (err.meta.cause.includes('Album')) {
          throw new UnknownIdException('albumId');
        } else if (err.meta.cause.includes('Artist')) {
          throw new UnknownIdException('artistId');
        }
      }

      throw err;
    }
  }

  async findAll(): Promise<TrackEntity[]> {
    const tracks = await this.prismaService.track.findMany();

    return tracks.map((track) => plainToClass(TrackEntity, track));
  }

  async findOne(id: string): Promise<TrackEntity | null> {
    const track = await this.prismaService.track.findUnique({ where: { id } });

    if (!track) {
      return null;
    }

    return plainToClass(TrackEntity, track);
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.prismaService.track.delete({ where: { id } });

      return true;
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025' // record not found
      ) {
        return false;
      }

      throw err;
    }
  }

  async updateInfo(
    id: string,
    { name, duration, artistId, albumId }: UpdateTrackInfoDto,
  ): Promise<TrackEntity | null> {
    try {
      const updatedTrack = await this.prismaService.track.update({
        where: { id },
        data: {
          name,
          duration,
          artist: artistId !== null ? { connect: { id: artistId } } : undefined,
          album: albumId !== null ? { connect: { id: albumId } } : undefined,
        },
      });

      return plainToClass(TrackEntity, updatedTrack);
    } catch (err) {
      console.error(JSON.stringify(err));
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025' && // record not found
        typeof err.meta.cause === 'string'
      ) {
        if (err.meta.cause.includes('Album')) {
          throw new UnknownIdException('albumId');
        } else if (err.meta.cause.includes('Artist')) {
          throw new UnknownIdException('artistId');
        } else {
          return null;
        }
      }

      throw err;
    }
  }
}
