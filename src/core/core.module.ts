import { Module } from '@nestjs/common';
import { LoggingService } from './services/logging/logging.service';
import { LogWriterService } from './services/log-writer/log-writer.service';

@Module({
  providers: [LoggingService, LogWriterService],
  exports: [LoggingService],
})
export class CoreModule {}
