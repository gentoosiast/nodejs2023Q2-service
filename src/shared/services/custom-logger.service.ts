import {
  ConsoleLogger,
  LogLevel as LogLevelName,
  Injectable,
  LoggerService,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as path from 'node:path';
import * as fsPromises from 'node:fs/promises';
import * as os from 'node:os';
import { EnvironmentVariables } from '@shared/intefaces/env-config';
import { LogLevel } from '@shared/enums/log-level.enum';

@Injectable()
export class LoggingService extends ConsoleLogger implements LoggerService {
  private combinedLogFilename = 'current-combined.log';
  private errorLogFilename = 'current-error.log';
  private logDirectory = path.join(process.cwd(), 'logs');
  private logLevel = this.configService.get('LOGGER_LOG_LEVEL', {
    infer: true,
  });
  private maxLogSize = this.configService.get('LOGGER_MAX_FILE_SIZE', {
    infer: true,
  });
  constructor(private configService: ConfigService<EnvironmentVariables>) {
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
    await this.outputMessage('error', message, optionalParams[0]);
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
    await this.writeToLog(output, levelName);
  }

  private async writeToLog(output: string, levelName: LogLevelName) {
    const logFilePath = path.join(this.logDirectory, this.combinedLogFilename);
    const errorLogFilePath = path.join(
      this.logDirectory,
      this.errorLogFilename,
    );
    const logOutput = output + os.EOL;

    const promises = [fsPromises.appendFile(logFilePath, logOutput)];
    if (levelName === 'error') {
      promises.push(fsPromises.appendFile(errorLogFilePath, logOutput));
    }

    await Promise.all(promises);
  }
}
