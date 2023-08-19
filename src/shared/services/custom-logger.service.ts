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
import {
  BYTES_IN_KB,
  DEFAULT_LOGGER_LOG_LEVEL,
  DEFAULT_LOGGER_MAX_FILE_SIZE,
} from '@shared/constants/env';

@Injectable()
export class LoggingService extends ConsoleLogger implements LoggerService {
  private currentLogPrefix = 'current';
  private combinedLogFilename = `${this.currentLogPrefix}-combined.log`;
  private errorLogFilename = `${this.currentLogPrefix}-error.log`;
  private logDirectory = path.join(process.cwd(), 'logs');
  private logLevel =
    +this.configService.get('LOGGER_LOG_LEVEL', {
      infer: true,
    }) ?? DEFAULT_LOGGER_LOG_LEVEL;
  private maxLogSize =
    (+this.configService.get('LOGGER_MAX_FILE_SIZE', {
      infer: true,
    }) ?? DEFAULT_LOGGER_MAX_FILE_SIZE) * BYTES_IN_KB;
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
    await this.writeToLog(output, levelName);
  }

  private async rotateLogIfNeeded(logPath: string) {
    try {
      const fsStats = await fsPromises.stat(logPath);
      if (fsStats.size > this.maxLogSize) {
        const currentPrefixRegExp = new RegExp(`${this.currentLogPrefix}-`);
        const newLogPath = logPath.replace(
          currentPrefixRegExp,
          `${Date.now()}-`,
        );

        await fsPromises.rename(logPath, newLogPath);
      }
    } catch {}
  }

  private async writeToLog(output: string, levelName: LogLevelName) {
    const logFilePath = path.join(this.logDirectory, this.combinedLogFilename);
    const errorLogFilePath = path.join(
      this.logDirectory,
      this.errorLogFilename,
    );
    const logOutput = Buffer.from(output + os.EOL);

    await this.rotateLogIfNeeded(logFilePath);
    const promises = [fsPromises.appendFile(logFilePath, logOutput)];
    if (levelName === 'error') {
      await this.rotateLogIfNeeded(errorLogFilePath);
      promises.push(fsPromises.appendFile(errorLogFilePath, logOutput));
    }

    await Promise.all(promises);
  }
}
