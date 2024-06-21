import { HttpStatus, Injectable } from '@nestjs/common';
import { SessionEntity } from './entity/session.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenService } from '../token/token.service';
import { jwtConfig } from '#src/common/configs/config';
import { UserService } from '../users/user.service';
import { ApiException } from '#src/common/exception-handler/api-exception';
import { CreateSession } from '#src/core/session/types/create-session.type';
import { LoggedUserRdo } from '#src/core/users/rdo/logged-user.rdo';
import { AllExceptions } from '#src/common/exception-handler/exeption-types/all-exceptions';
import { BaseEntityService } from '#src/common/base-entity/base-entity.service';
import { TokenPayload } from '#src/core/session/types/token.payload';
import SessionExceptions = AllExceptions.SessionExceptions;
import UserExceptions = AllExceptions.UserExceptions;

@Injectable()
export class SessionService extends BaseEntityService<
  SessionEntity,
  'SessionExceptions',
  LoggedUserRdo
> {
  constructor(
    @InjectRepository(SessionEntity)
    private readonly sessionRepository: Repository<SessionEntity>,
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
  ) {
    super(
      sessionRepository,
      new ApiException<'SessionExceptions'>(
        HttpStatus.NOT_FOUND,
        'SessionExceptions',
        SessionExceptions.SessionNotFound,
      ),
    );
  }

  async createSession(payload: CreateSession): Promise<LoggedUserRdo> {
    const user = await this.userService.findOne({
      where: { id: payload.userId },
    });

    if (!user) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'UserExceptions',
        UserExceptions.UserNotFound,
      );
    }

    const expireAt = new Date(Date.now() + jwtConfig.refreshExpire.ms());

    const session = await this.save({
      user: user,
      expireAt: expireAt,
    });

    return {
      accessToken: await this.tokenService.signAsync(
        {
          userId: payload.userId,
          sessionId: session.sessionId,
        } as TokenPayload,
        { expiresIn: jwtConfig.accessExpire.ms() },
      ),
      refreshToken: await this.tokenService.signAsync(
        {
          userId: payload.userId,
          sessionId: session.sessionId,
        } as TokenPayload,
        { expiresIn: jwtConfig.refreshExpire.ms() },
      ),
      sessionExpireAt: expireAt,
      phone: user.phone,
      userId: payload.userId,
    };
  }

  async refreshSession(token: string): Promise<LoggedUserRdo>;
  async refreshSession(sessionEntity: SessionEntity): Promise<LoggedUserRdo>;
  async refreshSession(
    tokenOrEntity: string | SessionEntity,
  ): Promise<LoggedUserRdo> {
    if (!tokenOrEntity) {
      throw new ApiException(
        HttpStatus.UNAUTHORIZED,
        'SessionExceptions',
        SessionExceptions.SessionNotFound,
      );
    }

    const userId =
      typeof tokenOrEntity === 'string'
        ? (await this.tokenService.verifyAsync<TokenPayload>(tokenOrEntity))
            .userId
        : tokenOrEntity.user?.id ?? <number>(<unknown>tokenOrEntity.user);

    await this.removeOne(tokenOrEntity);

    return await this.createSession({ userId: userId });
  }

  override async removeOne(
    entityOrToken: FindOneOptions<SessionEntity> | SessionEntity | string,
  ): Promise<void> {
    const entity =
      typeof entityOrToken === 'string'
        ? await this.findOne({
            where: {
              sessionId: (
                await this.tokenService.verifyAsync<TokenPayload>(entityOrToken)
              ).sessionId,
            },
          })
        : entityOrToken;

    return super.removeOne(entity);
  }
}
