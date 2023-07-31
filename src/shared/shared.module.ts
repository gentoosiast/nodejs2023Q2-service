import { Module } from '@nestjs/common';
import { InMemoryDbService } from './services/in-memory-db.service';
import { UUIDService } from './services/uuid.service';

@Module({
  providers: [InMemoryDbService, UUIDService],
  exports: [InMemoryDbService, UUIDService],
})
export class SharedModule {}
