import { HttpStatus, Injectable } from '@nestjs/common';
import { BaseEntityService } from '#src/common/base-entity/base-entity.service';
import { LanguageEntity } from '#src/core/languages/entities/language.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiException } from '#src/common/exception-handler/api-exception';
import { AllExceptions } from '#src/common/exception-handler/exeption-types/all-exceptions';
import { LanguageRdo } from '#src/core/languages/rdo/language.rdo';
import LanguageExceptions = AllExceptions.LanguageExceptions;

@Injectable()
export class LanguagesService extends BaseEntityService<
  LanguageEntity,
  'LanguageExceptions',
  LanguageRdo
> {
  constructor(
    @InjectRepository(LanguageEntity)
    private readonly languageRepository: Repository<LanguageEntity>,
  ) {
    super(
      languageRepository,
      new ApiException(
        HttpStatus.NOT_FOUND,
        'LanguageExceptions',
        LanguageExceptions.NotFound,
      ),
    );
  }
}
