import { Module } from '@nestjs/common';
import { InMemoryDbService } from './services/storage.service';
import { UUIDService } from './services/uuid.service';

@Module({
  providers: [InMemoryDbService, UUIDService],
  exports: [InMemoryDbService, UUIDService],
})
export class SharedModule {}
