import * as fsPromises from 'node:fs/promises';
import * as path from 'node:path';

export class LogWriter {
  private readonly logDirectory = path.join(process.cwd(), 'logs');
  private readonly logFilename: string;
  private readonly buffer: string[] = [];
  private isFlushUnderway = false;

  constructor(
    private readonly logName: string,
    private readonly maxLogSize: number,
    private readonly currentPrefix = 'current',
    private readonly flushInterval = 1000,
  ) {
    this.logFilename = `${this.currentPrefix}-${this.logName}.log`;

    setInterval(() => this.flushBuffer(), this.flushInterval);
  }

  addMessageToBuffer(message: string): void {
    this.buffer.push(message);
  }

  private async writeMessageToLog(message: string): Promise<void> {
    try {
      const logSize = await this.getLogSize();

      if (logSize + message.length >= this.maxLogSize) {
        const currentPrefixRegExp = new RegExp(`${this.currentPrefix}-`);
        const newLogFilename = this.logFilename.replace(
          currentPrefixRegExp,
          `${Date.now()}-`,
        );

        await fsPromises.rename(
          path.join(this.logDirectory, this.logFilename),
          path.join(this.logDirectory, newLogFilename),
        );
      }

      await fsPromises.appendFile(
        path.join(this.logDirectory, this.logFilename),
        message,
      );
    } catch {}
  }

  private async flushBuffer(): Promise<void> {
    if (this.isFlushUnderway) {
      return;
    }

    this.isFlushUnderway = true;
    while (this.buffer.length > 0) {
      const message = this.buffer.shift();
      await this.writeMessageToLog(message);
    }
    this.isFlushUnderway = false;
  }

  private async getLogSize(): Promise<number> {
    try {
      const fsStats = await fsPromises.stat(
        path.join(this.logDirectory, this.logFilename),
      );

      return fsStats.size;
    } catch {
      return 0;
    }
  }
}
