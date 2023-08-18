import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './services/prisma.service';
import { LoggingService } from './services/custom-logger.service';

@Module({
  providers: [PrismaService, LoggingService],
  imports: [ConfigModule],
  exports: [PrismaService, LoggingService],
})
export class SharedModule {}
