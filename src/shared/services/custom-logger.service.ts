import { Injectable, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@shared/intefaces/env-config';
import { LogLevel } from '@shared/enums/log-level.enum';

@Injectable()
export class LoggingService implements LoggerService {
  private logLevel = this.configService.get('LOGGER_LOG_LEVEL', {
    infer: true,
  });
  constructor(private configService: ConfigService<EnvironmentVariables>) {}

  log(message: any, ...optionalParams: any[]) {
    if (this.logLevel > LogLevel.Log) {
      return;
    }
    console.log(`custom log: ${message}`);
  }
  error(message: any, ...optionalParams: any[]) {
    if (this.logLevel > LogLevel.Error) {
      return;
    }
    console.log(`custom error: ${message}`);
  }
  warn(message: any, ...optionalParams: any[]) {
    if (this.logLevel > LogLevel.Warn) {
      return;
    }
    console.log(`custom warn: ${message}`);
  }
  debug?(message: any, ...optionalParams: any[]) {
    if (this.logLevel > LogLevel.Debug) {
      return;
    }
    console.log(`custom debug: ${message}`);
  }
  verbose?(message: any, ...optionalParams: any[]) {
    if (this.logLevel > LogLevel.Verbose) {
      return;
    }
    console.log(`custom verbose: ${message}`);
  }
  // setLogLevels?(levels: LogLevel[]) {}
}
