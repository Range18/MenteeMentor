import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiException } from './api-exception';
import { Response } from 'express';
import { ExceptionResponse } from './exeption-types/exception-response.type';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    let statusCode: number;
    let message: string;
    let description: string | object;

    if (exception instanceof ApiException) {
      statusCode = exception.status;
      message = exception.message;
      description = exception.description;
    } else if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      description = exception.getResponse();
      if (
        exception.getResponse() &&
        typeof exception.getResponse() === 'object'
      ) {
        const responseMessage = (<{ message: string[] | string }>(
          exception.getResponse()
        )).message;

        message = Array.isArray(responseMessage)
          ? responseMessage.join(', ')
          : responseMessage;
      } else {
        message = exception.message;
      }
    } else {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'INTERNAL_SERVER_ERROR';
    }

    const type = exception instanceof ApiException ? exception.type : undefined;

    if (statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      console.log(exception);
    }

    response.status(statusCode).json({
      success: false,
      statusCode: statusCode,
      type: type,
      message: message,
      description: description,
      output:
        statusCode === HttpStatus.INTERNAL_SERVER_ERROR ? exception : undefined,
    } as ExceptionResponse);
  }
}
