import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@shared/services/prisma.service';
import { CreateArtistDto } from './dtos/create-artist.dto';
import { UpdateArtistInfoDto } from './dtos/update-artist-info.dto';
import { ArtistEntity } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(artistDto: CreateArtistDto): Promise<ArtistEntity> {
    const artist = await this.prismaService.artist.create({ data: artistDto });

    return plainToClass(ArtistEntity, artist);
  }

  async findAll(): Promise<ArtistEntity[]> {
    const artists = await this.prismaService.artist.findMany();

    return artists.map((artist) => plainToClass(ArtistEntity, artist));
  }

  async findOne(id: string): Promise<ArtistEntity | null> {
    const artist = await this.prismaService.artist.findUnique({
      where: { id },
    });

    if (!artist) {
      return null;
    }

    return plainToClass(ArtistEntity, artist);
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.prismaService.artist.delete({
        where: { id },
      });

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
    artistDto: UpdateArtistInfoDto,
  ): Promise<ArtistEntity | null> {
    try {
      const updatedArtist = await this.prismaService.artist.update({
        where: { id },
        data: artistDto,
      });

      return plainToClass(ArtistEntity, updatedArtist);
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025' // record not found
      ) {
        return null;
      }

      throw err;
    }
  }
}
