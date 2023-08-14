import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { SharedModule } from '@shared/shared.module';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  imports: [SharedModule],
  exports: [ArtistService],
})
export class ArtistModule {}
