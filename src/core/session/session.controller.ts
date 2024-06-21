import { Controller, Post, Res } from '@nestjs/common';
import { LoggedUserRdo } from '#src/core/users/rdo/logged-user.rdo';
import { SessionService } from '#src/core/session/session.service';
import { ApiCreatedResponse, ApiTags, OmitType } from '@nestjs/swagger';
import { Session } from '#src/common/decorators/session.decorator';
import { type SessionRequest } from '#src/common/types/session-request.type';
import { AuthGuard } from '#src/common/decorators/guards/auth-guard.decorator';
import type { Response } from 'express';

@ApiTags('Sessions')
@Controller('sessions')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @ApiCreatedResponse({
    type: OmitType(LoggedUserRdo, ['refreshToken', 'sessionExpireAt']),
  })
  @AuthGuard()
  @Post('refresh')
  async refresh(
    @Res({ passthrough: true }) response: Response,
    @Session() session: SessionRequest,
  ): Promise<LoggedUserRdo> {
    const loggedUserDto = await this.sessionService.refreshSession(
      await this.sessionService.findOne({
        where: { sessionId: session.sessionId },
      }),
    );

    response.cookie('refreshToken', loggedUserDto.refreshToken, {
      httpOnly: true,
      secure: true,
      expires: loggedUserDto.sessionExpireAt,
    });

    return loggedUserDto;
  }
}
