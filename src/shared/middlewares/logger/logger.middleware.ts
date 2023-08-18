import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`request original url: ${req.originalUrl}`);
    console.log(`request url: ${req.baseUrl}`);
    console.log(`request method: ${req.method}`);
    console.log(`request query parameters: ${JSON.stringify(req.query)}`);
    console.log(`request body: ${JSON.stringify(req.body)}`);

    res.on('finish', () => {
      console.log(`response status: ${res.statusCode}`);
    });
    next();
  }
}
