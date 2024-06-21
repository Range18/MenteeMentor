import { UserEntity } from '#src/core/users/entity/user.entity';

export class GetUserRdo {
  readonly id: number;

  readonly name: string;

  readonly surname?: string;

  readonly phone: string;

  readonly email?: string;

  readonly isVerified: boolean;

  readonly updatedAt: Date;

  readonly createdAt: Date;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.name = user.name;
    this.surname = user.surname;
    this.phone = user.phone;
    this.email = user.email;
    this.isVerified = user.isVerified;

    this.updatedAt = user.updatedAt;
    this.createdAt = user.createdAt;
  }
}
