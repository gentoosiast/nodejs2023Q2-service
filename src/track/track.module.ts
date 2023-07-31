import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { FavsModule } from '@favs/favs.module';
import { SharedModule } from '@shared/shared.module';
import { TrackService } from './track.service';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
  imports: [FavsModule, SharedModule],
  exports: [TrackService],
})
export class TrackModule {}
