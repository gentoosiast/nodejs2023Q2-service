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

  async log(message: any, ...optionalParams: any[]) {
    if (this.logLevel > LogLevel.Log) {
      return;
    }
    await this.outputMessage('log', message, optionalParams[0]);
  }

  async error(message: any, ...optionalParams: any[]) {
    if (this.logLevel > LogLevel.Error) {
      return;
    }
    console.error(`optional 0: ${optionalParams[0]}`);
    await this.outputMessage('error', message, optionalParams[1]);
  }

  async warn(message: any, ...optionalParams: any[]) {
    if (this.logLevel > LogLevel.Warn) {
      return;
    }
    await this.outputMessage('warn', message, optionalParams[0]);
  }

  async debug(message: any, ...optionalParams: any[]) {
    if (this.logLevel > LogLevel.Debug) {
      return;
    }
    await this.outputMessage('debug', message, optionalParams[0]);
  }

  async verbose(message: any, ...optionalParams: any[]) {
    if (this.logLevel > LogLevel.Verbose) {
      return;
    }
    await this.outputMessage('verbose', message, optionalParams[0]);
  }

  private async outputMessage(
    levelName: LogLevelName,
    message: string,
    context = 'UnknownContext',
  ) {
    const timeStamp = new Date().toLocaleString();
    const output = `${timeStamp}: ${levelName.toUpperCase()} [${context}]: ${message}`;

    console.log(this.colorize(output, levelName));
    this.writeToLog(output, levelName);
  }

  private writeToLog(output: string, levelName: LogLevelName) {
    this.logWriterService.writeToCombinedLog(output + os.EOL);

    if (levelName === 'error') {
      this.logWriterService.writeToErrorLog(output + os.EOL);
    }
  }
}
