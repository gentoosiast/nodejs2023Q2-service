import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggingService } from './services/logging/logging.service';
import { LogWriterService } from './services/log-writer/log-writer.service';

@Module({
  providers: [LoggingService, LogWriterService],
  imports: [ConfigModule],
  exports: [LoggingService],
})
export class CoreModule {}
