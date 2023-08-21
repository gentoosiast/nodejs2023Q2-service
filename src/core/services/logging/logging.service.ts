import {
  ConsoleLogger,
  LogLevel as LogLevelName,
  Injectable,
  LoggerService,
} from '@nestjs/common';
import * as os from 'node:os';
import { LogWriterService } from '../log-writer/log-writer.service';
import { LogLevel } from '@core/enums/log-level.enum';
import { parseNumber } from '@shared/helpers/parse-number';
import { DEFAULT_LOGGER_LOG_LEVEL } from '@config/constants';

@Injectable()
export class LoggingService extends ConsoleLogger implements LoggerService {
  private readonly logLevel =
    parseNumber(process.env.LOGGER_LOG_LEVEL) ?? DEFAULT_LOGGER_LOG_LEVEL;

  constructor(private readonly logWriterService: LogWriterService) {
    super();
  }

  log(message: unknown, context?: string): void {
    if (this.logLevel > LogLevel.Log) {
      return;
    }
    this.outputMessage('log', message, context);
  }

  error(message: unknown, stack?: string, context?: string): void {
    this.outputMessage('error', message, context, stack);
  }

  warn(message: unknown, context?: string): void {
    if (this.logLevel > LogLevel.Warn) {
      return;
    }
    this.outputMessage('warn', message, context);
  }

  debug(message: unknown, context?: string): void {
    if (this.logLevel > LogLevel.Debug) {
      return;
    }
    this.outputMessage('debug', message, context);
  }

  verbose(message: unknown, context?: string): void {
    if (this.logLevel > LogLevel.Verbose) {
      return;
    }
    this.outputMessage('verbose', message, context);
  }

  private outputMessage(
    levelName: LogLevelName,
    message: unknown,
    context = 'UnknownContext',
    stack?: string,
  ): void {
    const timeStamp = new Date().toLocaleString();
    const output = `${timeStamp}: PID${
      process.pid
    } ${levelName.toUpperCase()} [${context}]: ${message}${
      stack ? os.EOL + stack : ''
    }`;

    console.log(this.colorize(output, levelName));
    this.writeToLog(output, levelName);
  }

  private writeToLog(output: string, levelName: LogLevelName): void {
    this.logWriterService.writeToCombinedLog(output + os.EOL);

    if (levelName === 'error') {
      this.logWriterService.writeToErrorLog(output + os.EOL);
    }
  }
}
