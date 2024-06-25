import { HttpStatus, Injectable } from '@nestjs/common';
import { BaseEntityService } from '#src/common/base-entity/base-entity.service';
import { QuestionEntity } from '#src/core/questions/entities/question.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiException } from '#src/common/exception-handler/api-exception';
import { AllExceptions } from '#src/common/exception-handler/exeption-types/all-exceptions';
import QuestionExceptions = AllExceptions.QuestionExceptions;

@Injectable()
export class QuestionsService extends BaseEntityService<
  QuestionEntity,
  'QuestionExceptions'
> {
  constructor(
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,
  ) {
    super(
      questionRepository,
      new ApiException(
        HttpStatus.NOT_FOUND,
        'QuestionExceptions',
        QuestionExceptions.NotFound,
      ),
    );
  }
}
