import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { InMemoryDbService } from '@shared/services/storage.service';
import { UUIDService } from '@shared/services/uuid.service';
import { FavsController } from './favs.controller';

@Module({
  controllers: [FavsController],
  providers: [FavsService, InMemoryDbService, UUIDService],
})
export class FavsModule {}
