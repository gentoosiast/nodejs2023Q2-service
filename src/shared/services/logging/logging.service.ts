import {
  ConsoleLogger,
  LogLevel as LogLevelName,
  Injectable,
  LoggerService,
} from '@nestjs/common';
import * as os from 'node:os';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@config/interfaces/env-config';
import { LogWriterService } from '../log-writer/log-writer.service';
import { LogLevel } from '@shared/enums/log-level.enum';

@Injectable()
export class LoggingService extends ConsoleLogger implements LoggerService {
  private logLevel = this.configService.get('logger.logLevel', {
    infer: true,
  });
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
    private readonly logWriterService: LogWriterService,
  ) {
    super();
  }

  log(message: unknown, context?: string): void {
    if (this.logLevel > LogLevel.Log) {
      return;
    }
    this.outputMessage('log', message, context);
  }

  error(message: unknown, stack?: string, context?: string): void {
    if (this.logLevel > LogLevel.Error) {
      return;
    }
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
    const output = `${timeStamp}: ${levelName.toUpperCase()} [${context}]: ${message}${
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
