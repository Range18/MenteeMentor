import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { SessionRequest } from '#src/common/types/session-request.type';
export const Session = createParamDecorator(
  (
    property: keyof SessionRequest,
    context: ExecutionContext,
  ): SessionRequest | string | Date => {
    const request = context.switchToHttp().getRequest();
    return property ? request.session[property] : request.session;
  },
);
