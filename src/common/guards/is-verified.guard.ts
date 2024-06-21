import { CanActivate, ExecutionContext, HttpStatus } from '@nestjs/common';
import { UserService } from '#src/core/users/user.service';
import { RequestExtended } from '#src/common/types/request-extended.type';
import { ApiException } from '#src/common/exception-handler/api-exception';
import { AllExceptions } from '#src/common/exception-handler/exeption-types/all-exceptions';
import AuthExceptions = AllExceptions.AuthExceptions;

export class IsVerifiedGuardClass implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestExtended>();

    const userEntity = await this.userService.findOne({
      where: { id: request.user.id },
    });

    if (!userEntity.isVerified) {
      throw new ApiException(
        HttpStatus.FORBIDDEN,
        'AuthExceptions',
        AuthExceptions.IsNotVerified,
      );
    }

    return userEntity.isVerified;
  }
}
