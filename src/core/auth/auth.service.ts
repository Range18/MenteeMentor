import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoggedUserRdo } from '../users/rdo/logged-user.rdo';
import { UserService } from '../users/user.service';
import { ApiException } from '#src/common/exception-handler/api-exception';
import { SessionService } from '../session/session.service';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { AllExceptions } from '#src/common/exception-handler/exeption-types/all-exceptions';
import bcrypt from 'bcrypt';
import { passwordSaltRounds } from '#src/common/configs/config';
import { VerificationCodesService } from '#src/core/verification-codes/verification-codes.service';
import { AdminService } from '#src/core/admin-panel/admin.service';
import AuthExceptions = AllExceptions.AuthExceptions;
import UserExceptions = AllExceptions.UserExceptions;

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
    private readonly verificationCodesService: VerificationCodesService,
    private readonly adminService: AdminService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<LoggedUserRdo> {
    const user = await this.userService.findOne(
      {
        where: { phone: createUserDto.phone },
      },
      false,
    );

    if (user) {
      throw new ApiException(
        HttpStatus.CONFLICT,
        'UserExceptions',
        UserExceptions.UserAlreadyExists,
      );
    }

    const userEntity = await this.userService.save({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, passwordSaltRounds),
    });

    await this.userService.save(
      await this.adminService.setDefaultValuesForUser(userEntity),
    );

    const session = await this.sessionService.createSession({
      userId: userEntity.id,
    });

    await this.verificationCodesService.save({
      //TODO generate codes
      code: '1234',
      user: userEntity,
    });

    return new LoggedUserRdo(
      session.accessToken,
      session.refreshToken,
      session.sessionExpireAt,
      userEntity.id,
      userEntity.phone,
    );
  }

  async login(loginUserDto: LoginUserDto): Promise<LoggedUserRdo> {
    const user = await this.userService.findOne({
      where: { phone: loginUserDto.login },
    });

    if (!user) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'UserExceptions',
        UserExceptions.UserNotFound,
      );
    }

    const isEqualPassword = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );

    if (!isEqualPassword) {
      throw new ApiException(
        HttpStatus.BAD_REQUEST,
        'AuthExceptions',
        AuthExceptions.WrongPassword,
      );
    }

    const session = await this.sessionService.createSession({
      userId: user.id,
    });

    return new LoggedUserRdo(
      session.accessToken,
      session.refreshToken,
      session.sessionExpireAt,
      user.id,
      user.phone,
    );
  }

  async logout(sessionId: string): Promise<void> {
    await this.sessionService.removeOne({
      where: { sessionId: sessionId },
    });
  }
}
