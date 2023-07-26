import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { UUIDService } from '@shared/services/uuid.service';

@Module({
  controllers: [TrackController],
  providers: [TrackService, UUIDService],
})
export class TrackModule {}
