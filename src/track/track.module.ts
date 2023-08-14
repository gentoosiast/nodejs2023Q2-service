import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { SharedModule } from '@shared/shared.module';
import { TrackService } from './track.service';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
  imports: [SharedModule],
  exports: [TrackService],
})
export class TrackModule {}
