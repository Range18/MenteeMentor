export class GetUserRdo {
  readonly id: number;

  readonly name: string;

  readonly surname?: string;

  readonly phone: string;

  readonly email?: string;

  readonly isVerified: boolean;

  readonly updatedAt: Date;

  readonly createdAt: Date;
}
