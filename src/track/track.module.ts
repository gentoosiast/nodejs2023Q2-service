import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { InMemoryDbService } from '@shared/services/storage.service';
import { TrackService } from './track.service';
import { UUIDService } from '@shared/services/uuid.service';

@Module({
  controllers: [TrackController],
  providers: [InMemoryDbService, TrackService, UUIDService],
})
export class TrackModule {}
