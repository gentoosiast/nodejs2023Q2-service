import {
  ConsoleLogger,
  LogLevel as LogLevelName,
  Injectable,
  LoggerService,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@shared/intefaces/env-config';
import { LogLevel } from '@shared/enums/log-level.enum';

@Injectable()
export class LoggingService extends ConsoleLogger implements LoggerService {
  private logLevel = this.configService.get('LOGGER_LOG_LEVEL', {
    infer: true,
  });
  constructor(private configService: ConfigService<EnvironmentVariables>) {
    super();
  }

  log(message: any, ...optionalParams: any[]) {
    if (this.logLevel > LogLevel.Log) {
      return;
    }
    this.outputMessage('log', optionalParams[0], message);
  }

  error(message: any, ...optionalParams: any[]) {
    if (this.logLevel > LogLevel.Error) {
      return;
    }
    this.outputMessage('error', optionalParams[0], message);
  }

  warn(message: any, ...optionalParams: any[]) {
    if (this.logLevel > LogLevel.Warn) {
      return;
    }
    this.outputMessage('warn', optionalParams[0], message);
  }

  debug(message: any, ...optionalParams: any[]) {
    if (this.logLevel > LogLevel.Debug) {
      return;
    }
    this.outputMessage('debug', optionalParams[0], message);
  }

  verbose(message: any, ...optionalParams: any[]) {
    if (this.logLevel > LogLevel.Verbose) {
      return;
    }
    this.outputMessage('verbose', optionalParams[0], message);
  }

  private outputMessage(
    levelName: LogLevelName,
    context: string,
    message: string,
  ) {
    const timeStamp = new Date().toLocaleString();
    const output = `${timeStamp}: ${levelName.toUpperCase()} [${context}]: ${message}`;

    console.log(this.colorize(output, levelName));
  }
}
