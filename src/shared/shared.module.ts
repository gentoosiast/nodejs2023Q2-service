import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './services/prisma.service';
import { LoggingService } from './services/logging/logging.service';
import { LogWriterService } from './services/log-writer/log-writer.service';

@Module({
  providers: [PrismaService, LoggingService, LogWriterService],
  imports: [ConfigModule],
  exports: [PrismaService, LoggingService],
})
export class SharedModule {}
