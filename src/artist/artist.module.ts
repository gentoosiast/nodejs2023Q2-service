import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { AlbumService } from '@album/album.service';
import { TrackService } from '@track/track.service';
import { UUIDService } from '@shared/services/uuid.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, AlbumService, TrackService, UUIDService],
})
export class ArtistModule {}
