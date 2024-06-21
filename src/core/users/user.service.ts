import { HttpStatus, Injectable } from '@nestjs/common';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiException } from '#src/common/exception-handler/api-exception';
import { AllExceptions } from '#src/common/exception-handler/exeption-types/all-exceptions';
import { BaseEntityService } from '#src/common/base-entity/base-entity.service';
import { GetUserRdo } from '#src/core/users/rdo/get-user.rdo';
import UserExceptions = AllExceptions.UserExceptions;

@Injectable()
export class UserService extends BaseEntityService<
  UserEntity,
  'UserExceptions',
  GetUserRdo
> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    super(
      userRepository,
      new ApiException<'UserExceptions'>(
        HttpStatus.NOT_FOUND,
        'UserExceptions',
        UserExceptions.UserNotFound,
      ),
    );
  }
}
