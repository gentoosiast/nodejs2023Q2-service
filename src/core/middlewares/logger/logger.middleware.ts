import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      const { statusCode } = res;
      const message = `${req.method} ${req.originalUrl} ${JSON.stringify(
        req.body,
      )} HTTP ${res.statusCode}`;

      if (statusCode >= 500) {
        this.logger.error(message);
      } else if (statusCode >= 400) {
        this.logger.log(message);
      } else {
        this.logger.debug(message);
      }
    });
    next();
  }
}
