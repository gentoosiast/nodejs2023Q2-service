import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { UUIDService } from '@shared/services/uuid.service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, UUIDService],
})
export class AlbumModule {}
