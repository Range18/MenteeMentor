import { HttpStatus, Injectable } from '@nestjs/common';
import { BaseEntityService } from '#src/common/base-entity/base-entity.service';
import { TagEntity } from '#src/core/subjects/tags/entities/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiException } from '#src/common/exception-handler/api-exception';
import { AllExceptions } from '#src/common/exception-handler/exeption-types/all-exceptions';
import TagExceptions = AllExceptions.TagExceptions;

@Injectable()
export class TagsService extends BaseEntityService<TagEntity, 'TagExceptions'> {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagsRepository: Repository<TagEntity>,
  ) {
    super(
      tagsRepository,
      new ApiException(
        HttpStatus.NOT_FOUND,
        'TagExceptions',
        TagExceptions.NotFound,
      ),
    );
  }
}
