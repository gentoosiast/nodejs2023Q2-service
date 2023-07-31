import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { AlbumModule } from '@album/album.module';
import { FavsModule } from '@favs/favs.module';
import { SharedModule } from '@shared/shared.module';
import { TrackModule } from '@track/track.module';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  imports: [AlbumModule, FavsModule, SharedModule, TrackModule],
  exports: [ArtistService],
})
export class ArtistModule {}
