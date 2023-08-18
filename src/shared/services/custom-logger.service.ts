import { Injectable, LogLevel, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LoggingService implements LoggerService {
  constructor(private configService: ConfigService) {}

  log(message: any, ...optionalParams: any[]) {
    console.log(`custom log: ${message}`);
  }
  error(message: any, ...optionalParams: any[]) {
    console.log(`custom error: ${message}`);
  }
  warn(message: any, ...optionalParams: any[]) {
    console.log(`custom warn: ${message}`);
  }
  debug?(message: any, ...optionalParams: any[]) {
    console.log(`custom debug: ${message}`);
  }
  verbose?(message: any, ...optionalParams: any[]) {
    console.log(`custom verbose: ${message}`);
  }
  setLogLevels?(levels: LogLevel[]) {}
}
