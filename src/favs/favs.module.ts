import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { SharedModule } from '@shared/shared.module';
import { FavsController } from './favs.controller';

@Module({
  controllers: [FavsController],
  providers: [FavsService],
  imports: [SharedModule],
  exports: [FavsService],
})
export class FavsModule {}
