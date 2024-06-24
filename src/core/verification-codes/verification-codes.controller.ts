import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { VerificationCodesService } from './verification-codes.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { type UserRequest } from '#src/common/types/user-request.type';
import { User } from '#src/common/decorators/User.decorator';
import { VerifyCodeDto } from '#src/core/verification-codes/dto/verify-code.dto';
import { AuthGuard } from '#src/common/decorators/guards/auth-guard.decorator';
import { SuccessRdo } from '#src/core/verification-codes/rdo/success.rdo';

@ApiTags('Verification codes')
@Controller('verification-codes')
export class VerificationCodesController {
  constructor(
    private readonly verificationCodesService: VerificationCodesService,
  ) {}

  @ApiCreatedResponse({ type: SuccessRdo })
  @AuthGuard()
  @Post()
  async create(@User() user: UserRequest): Promise<SuccessRdo> {
    await this.verificationCodesService.save({
      user: { id: user.id },
      //TODO generate codes
      code: '1234',
    });

    return { success: true };
  }

  @AuthGuard()
  @HttpCode(200)
  @Post('verify')
  async verify(
    @User() user: UserRequest,
    @Body() body: VerifyCodeDto,
  ): Promise<SuccessRdo> {
    return await this.verificationCodesService.verify(body.code, user.id);
  }
}
