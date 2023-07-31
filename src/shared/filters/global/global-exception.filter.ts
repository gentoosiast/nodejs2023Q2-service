import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { UnknownIdException } from '@shared/exceptions/unknown-id.exception';

interface ApiError {
  message: string;
  error: string;
  statusCode: number;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    let body: ApiError;
    let status: HttpStatus;
    if (exception instanceof UnknownIdException) {
      const statusCode = HttpStatus.BAD_REQUEST;

      body = {
        message: exception.message,
        error: exception.name,
        statusCode,
      };
      status = statusCode;
    } else if (exception instanceof HttpException) {
      const statusCode = exception.getStatus();

      body = {
        message: exception.message,
        error: exception.name,
        statusCode,
      };
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
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(status).json(body);
  }
}
