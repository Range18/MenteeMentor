import { HttpStatus, Injectable } from '@nestjs/common';
import { BaseEntityService } from '#src/common/base-entity/base-entity.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiException } from '#src/common/exception-handler/api-exception';
import { AllExceptions } from '#src/common/exception-handler/exeption-types/all-exceptions';
import { ProfileEntity } from '#src/core/users/profiles/entities/profile.entity';
import { ProfileRdo } from '#src/core/users/profiles/rdo/profile.rdo';
import ProfileExceptions = AllExceptions.ProfileExceptions;

@Injectable()
export class ProfilesService extends BaseEntityService<
  ProfileEntity,
  'ProfileExceptions',
  ProfileRdo
> {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
  ) {
    super(
      profileRepository,
      new ApiException(
        HttpStatus.NOT_FOUND,
        'ProfileExceptions',
        ProfileExceptions.NotFound,
      ),
    );
  }
}
