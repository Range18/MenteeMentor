import { HttpStatus } from '@nestjs/common';

export class ExceptionResponse {
  success: boolean;
  statusCode: HttpStatus;
  type?: string;
  message: string;
  description?: string | object;
  output?: string;
}
