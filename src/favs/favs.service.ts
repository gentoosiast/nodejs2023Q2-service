import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@shared/services/prisma.service';
import { FavsResponseDto } from './dtos/favs-response.dto';

@Injectable()
export class FavsService {
  constructor(private prismaService: PrismaService) {}

  async addAlbum(id: string): Promise<boolean> {
    try {
      await this.prismaService.albumOnFav.create({ data: { albumId: id } });

      return true;
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2003'
      ) {
        return false; // foreign key constraint failed
      }

      throw err;
    }
  }

  async addArtist(id: string): Promise<boolean> {
    try {
      await this.prismaService.artistOnFav.create({ data: { artistId: id } });

      return true;
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2003'
      ) {
        return false; // foreign key constraint failed
      }

      throw err;
    }
  }

  async addTrack(id: string): Promise<boolean> {
    try {
      await this.prismaService.trackOnFav.create({ data: { trackId: id } });

      return true;
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2003'
      ) {
        return false; // foreign key constraint failed
      }

      throw err;
    }
  }

  async findAll(): Promise<FavsResponseDto> {
    const [albumFavs, artistFavs, trackFavs] = await Promise.all([
      this.prismaService.albumOnFav.findMany({ include: { album: true } }),
      this.prismaService.artistOnFav.findMany({ include: { artist: true } }),
      this.prismaService.trackOnFav.findMany({ include: { track: true } }),
    ]);

    const response = {
      albums: albumFavs.map((fav) => fav.album),
      artists: artistFavs.map((fav) => fav.artist),
      tracks: trackFavs.map((fav) => fav.track),
    };

    return response;
  }

  async removeAlbum(id: string): Promise<boolean> {
    try {
      await this.prismaService.albumOnFav.delete({ where: { albumId: id } });

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

  async removeArtist(id: string): Promise<boolean> {
    try {
      await this.prismaService.artistOnFav.delete({ where: { artistId: id } });

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

  async removeTrack(id: string): Promise<boolean> {
    try {
      await this.prismaService.trackOnFav.delete({ where: { trackId: id } });

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
}
