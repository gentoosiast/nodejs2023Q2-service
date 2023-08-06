import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { SharedModule } from '@shared/shared.module';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  imports: [SharedModule],
  exports: [AlbumService],
})
export class AlbumModule {}
