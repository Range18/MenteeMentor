import { Body, Controller, Delete, HttpCode, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { type Response } from 'express';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoggedUserRdo } from '../users/rdo/logged-user.rdo';
import { LoginUserDto } from '#src/core/users/dto/login-user.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  OmitType,
} from '@nestjs/swagger';
import { Session } from '#src/common/decorators/session.decorator';

import { type SessionRequest } from '#src/common/types/session-request.type';
import { AuthGuard } from '#src/common/decorators/guards/auth-guard.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({
    type: OmitType(LoggedUserRdo, ['refreshToken', 'sessionExpireAt']),
  })
  @Post('register')
  async registration(
    @Res({ passthrough: true }) response: Response,
    @Body() createUserDto: CreateUserDto,
  ): Promise<LoggedUserRdo> {
    const loggedUserDto = await this.authService.register(createUserDto);

    response.cookie('refreshToken', loggedUserDto.refreshToken, {
      httpOnly: true,
      secure: true,
      expires: loggedUserDto.sessionExpireAt,
    });

    return loggedUserDto;
  }

  @ApiOkResponse({
    type: OmitType(LoggedUserRdo, ['refreshToken', 'sessionExpireAt']),
  })
  @HttpCode(200)
  @Post('login')
  async login(
    @Res({ passthrough: true }) response: Response,
    @Body() loginUserDto: LoginUserDto,
  ): Promise<LoggedUserRdo> {
    const loggedUserDto = await this.authService.login(loginUserDto);

    response.cookie('refreshToken', loggedUserDto.refreshToken, {
      httpOnly: true,
      secure: true,
      expires: loggedUserDto.sessionExpireAt,
    });

    return loggedUserDto;
  }

  @AuthGuard()
  @Delete('logout')
  async logout(
    @Res({ passthrough: true }) response: Response,
    @Session() session: SessionRequest,
  ): Promise<void> {
    await this.authService.logout(session.sessionId);

    response.clearCookie('refreshToken');
  }
}
