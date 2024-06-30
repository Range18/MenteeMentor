import { applyDecorators, UseGuards } from '@nestjs/common';
import { IsVerifiedGuardClass } from '#src/common/guards/is-verified.guard';

export const IsVerifiedGuard = () => {
  return applyDecorators(UseGuards(IsVerifiedGuardClass));
};
