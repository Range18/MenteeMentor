import { HttpStatus, Injectable } from '@nestjs/common';
import { BaseEntityService } from '#src/common/base-entity/base-entity.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiException } from '#src/common/exception-handler/api-exception';
import { ThemeRdo } from '#src/core/subjects/themes/rdo/theme.rdo';
import { ThemeEntity } from '#src/core/subjects/themes/entities/theme.entity';
import { AllExceptions } from '#src/common/exception-handler/exeption-types/all-exceptions';
import ThemeExceptions = AllExceptions.ThemeExceptions;

@Injectable()
export class ThemeService extends BaseEntityService<
  ThemeEntity,
  'ThemeExceptions',
  ThemeRdo
> {
  constructor(
    @InjectRepository(ThemeEntity)
    private readonly themesRepository: Repository<ThemeEntity>,
  ) {
    super(
      themesRepository,
      new ApiException(
        HttpStatus.NOT_FOUND,
        'ThemeExceptions',
        ThemeExceptions.NotFound,
      ),
    );
  }
}
