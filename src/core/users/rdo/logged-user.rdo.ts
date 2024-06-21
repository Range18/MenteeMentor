import { Exclude } from 'class-transformer';

export class LoggedUserRdo {
  readonly accessToken: string;

  @Exclude()
  readonly refreshToken: string;

  @Exclude()
  readonly sessionExpireAt: Date;

  readonly userId: number;

  readonly phone: string;

  constructor(
    accessToken: string,
    refreshToken: string,
    sessionExpireAt: Date,
    userId: number,
    phone: string,
  ) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.sessionExpireAt = sessionExpireAt;
    this.userId = userId;
    this.phone = phone;
  }
}
