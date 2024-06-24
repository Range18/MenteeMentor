import { HttpStatus, Injectable } from '@nestjs/common';
import { BaseEntityService } from '#src/common/base-entity/base-entity.service';
import { InjectRepository } from '@nestjs/typeorm';
import { SubjectEntity } from '#src/core/subjects/entities/subject.entity';
import { Repository } from 'typeorm';
import { ApiException } from '#src/common/exception-handler/api-exception';
import { AllExceptions } from '#src/common/exception-handler/exeption-types/all-exceptions';
import { SubjectRdo } from '#src/core/subjects/rdo/subject.rdo';
import SubjectExceptions = AllExceptions.SubjectExceptions;

@Injectable()
export class SubjectsService extends BaseEntityService<
  SubjectEntity,
  'SubjectExceptions',
  SubjectRdo
> {
  constructor(
    @InjectRepository(SubjectEntity)
    private readonly subjectRepository: Repository<SubjectEntity>,
  ) {
    super(
      subjectRepository,
      new ApiException(
        HttpStatus.NOT_FOUND,
        'SubjectExceptions',
        SubjectExceptions.NotFound,
      ),
    );
  }
}
