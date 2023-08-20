import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpExceptionBody,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import * as os from 'node:os';
import { UnknownIdException } from '@shared/exceptions/unknown-id.exception';
import { UniqueConstraintException } from '@shared/exceptions/unique-constraint.exception';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: Error, host: ArgumentsHost) {
    let body: HttpExceptionBody;
    let status: HttpStatus;
    if (exception instanceof UnknownIdException) {
      const statusCode = HttpStatus.BAD_REQUEST;

      body = {
        message: exception.message,
        error: exception.name,
        statusCode,
      };
      status = statusCode;
    } else if (exception instanceof UniqueConstraintException) {
      const statusCode = HttpStatus.CONFLICT;

      body = {
        message: exception.message,
        error: exception.name,
        statusCode,
      };
      status = statusCode;
    } else if (exception instanceof HttpException) {
      const statusCode = exception.getStatus();

      const exceptionResponse = exception.getResponse();
      if (typeof exceptionResponse !== 'string') {
        body = exceptionResponse as HttpExceptionBody;
      } else {
        body = {
          message: exceptionResponse,
          error: exception.name,
          statusCode,
        };
      }
      status = statusCode;
    } else {
      const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

      body = {
        message: exception.message,
        error: exception.name,
        statusCode,
      };
      status = statusCode;
    }

    const logMessage = `Exception: ${body.error} HTTP ${body.statusCode}${os.EOL}${body.message}`;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (body.statusCode >= 500) {
      this.logger.error(logMessage);
    } else if (body.statusCode >= 400) {
      this.logger.log(logMessage);
    } else {
      this.logger.debug(logMessage);
    }

    response.status(status).json(body);
  }
}
