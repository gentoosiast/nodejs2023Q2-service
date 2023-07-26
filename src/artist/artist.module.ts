import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { InMemoryDbService } from '@shared/services/storage.service';
import { UUIDService } from '@shared/services/uuid.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, InMemoryDbService, UUIDService],
})
export class ArtistModule {}
