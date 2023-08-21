import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BYTES_IN_KB } from '@core/constants/logger';
import { LogWriter } from '@core/lib/log-writer/log-writer';

@Injectable()
export class LogWriterService {
  private readonly maxFileSize =
    this.configService.get('logger.maxFileSize', { infer: true }) * BYTES_IN_KB;
  private readonly combinedLogWriter = new LogWriter(
    'combined',
    this.maxFileSize,
  );
  private readonly errorLogWriter = new LogWriter('error', this.maxFileSize);

  constructor(private readonly configService: ConfigService) {}

  writeToCombinedLog(message: string): void {
    this.combinedLogWriter.addMessageToBuffer(message);
  }

  writeToErrorLog(message: string): void {
    this.errorLogWriter.addMessageToBuffer(message);
  }
}
