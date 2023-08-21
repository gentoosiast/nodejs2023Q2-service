import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@shared/services/prisma/prisma.service';
import { CreateAlbumDto } from './dtos/create-album.dto';
import { UpdateAlbumInfoDto } from './dtos/update-album-info.dto';
import { AlbumEntity } from './entities/album.entity';
import { UnknownIdException } from '@shared/exceptions/unknown-id.exception';

@Injectable()
export class AlbumService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(albumDto: CreateAlbumDto): Promise<AlbumEntity> {
    try {
      const album = await this.prismaService.album.create({ data: albumDto });

      return plainToClass(AlbumEntity, album);
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2003' // "Foreign key constraint failed on the field: {field_name}"
      ) {
        throw new UnknownIdException('artistId');
      }

      throw err;
    }
  }

  async findAll(): Promise<AlbumEntity[]> {
    const albums = await this.prismaService.album.findMany();

    return albums.map((album) => plainToClass(AlbumEntity, album));
  }

  async findOne(id: string): Promise<AlbumEntity | null> {
    const album = this.prismaService.album.findUnique({ where: { id } });

    if (!album) {
      return null;
    }

    return plainToClass(AlbumEntity, album);
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.prismaService.album.delete({ where: { id } });

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
    albumDto: UpdateAlbumInfoDto,
  ): Promise<AlbumEntity | null> {
    try {
      const updatedAlbum = await this.prismaService.album.update({
        where: { id },
        data: albumDto,
      });

      return plainToClass(AlbumEntity, updatedAlbum);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
          // record not found
          return null;
        } else if (err.code === 'P2003') {
          // "Foreign key constraint failed on the field: {field_name}"
          throw new UnknownIdException('artistId');
        }
      }
      throw err;
    }
  }
}
