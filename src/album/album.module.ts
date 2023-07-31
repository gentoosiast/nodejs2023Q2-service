import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { FavsModule } from '@favs/favs.module';
import { SharedModule } from '@shared/shared.module';
import { TrackModule } from '@track/track.module';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  imports: [FavsModule, SharedModule, TrackModule],
  exports: [AlbumService],
})
export class AlbumModule {}
