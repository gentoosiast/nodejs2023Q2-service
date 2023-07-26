import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { UUIDService } from '@shared/services/uuid.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, UUIDService],
})
export class ArtistModule {}
