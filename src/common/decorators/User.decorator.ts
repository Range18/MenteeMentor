import {
  createParamDecorator,
  ExecutionContext,
  HttpStatus,
} from '@nestjs/common';
import { UserRequest } from '#src/common/types/user-request.type';
import { RequestExtended } from '#src/common/types/request-extended.type';
import { ApiException } from '#src/common/exception-handler/api-exception';
import { AllExceptions } from '#src/common/exception-handler/exeption-types/all-exceptions';
import UserExceptions = AllExceptions.UserExceptions;

export const User = createParamDecorator(
  (key: keyof UserRequest, context: ExecutionContext): any | UserRequest => {
    const request = context.switchToHttp().getRequest<RequestExtended>();
    const user = request.user;

    if (!user) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'UserExceptions',
        UserExceptions.UserNotFound,
        'AuthGuard must be provided',
      );
    }

    return key ? user[key] : user;
  },
);
