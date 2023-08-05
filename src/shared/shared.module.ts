import { Module } from '@nestjs/common';
import { InMemoryDbService } from './services/in-memory-db.service';
import { PrismaService } from './services/prisma.service';
import { UUIDService } from './services/uuid.service';

@Module({
  providers: [InMemoryDbService, PrismaService, UUIDService],
  exports: [InMemoryDbService, PrismaService, UUIDService],
})
export class SharedModule {}
