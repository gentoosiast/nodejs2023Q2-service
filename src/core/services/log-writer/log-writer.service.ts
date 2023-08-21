import { Injectable } from '@nestjs/common';
import { LogWriter } from '@core/lib/log-writer/log-writer';
import { DEFAULT_LOGGER_MAX_FILE_SIZE } from '@config/constants';
import { BYTES_IN_KB } from '@core/constants/logger';

@Injectable()
export class LogWriterService {
  private readonly maxFileSize =
    (parseInt(process.env.LOGGER_MAX_FILE_SIZE, 10) ||
      DEFAULT_LOGGER_MAX_FILE_SIZE) * BYTES_IN_KB;
  private readonly combinedLogWriter = new LogWriter(
    'combined',
    this.maxFileSize,
  );
  private readonly errorLogWriter = new LogWriter('error', this.maxFileSize);

  writeToCombinedLog(message: string): void {
    this.combinedLogWriter.addMessageToBuffer(message);
  }

  writeToErrorLog(message: string): void {
    this.errorLogWriter.addMessageToBuffer(message);
  }
}
