import { applyDecorators, UseGuards } from '@nestjs/common';

export const IsVerifiedGuard = () => {
  return applyDecorators(UseGuards(IsVerifiedGuard));
};
