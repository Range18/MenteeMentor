import { GetUserRdo } from '#src/core/users/rdo/get-user.rdo';
import { LanguageRdo } from '#src/core/languages/rdo/language.rdo';
import { SubjectRdo } from '#src/core/subjects/rdo/subject.rdo';
import { plainToInstance, Transform } from 'class-transformer';
import { LanguageEntity } from '#src/core/languages/entities/language.entity';
import { SubjectEntity } from '#src/core/subjects/entities/subject.entity';

export class ProfileRdo {
  readonly id: number;

  @Transform(({ value }) => plainToInstance(GetUserRdo, value))
  readonly user: GetUserRdo;

  @Transform(({ value }) =>
    value?.map((language: LanguageEntity) =>
      plainToInstance(LanguageRdo, language),
    ),
  )
  readonly languages: LanguageRdo[];

  @Transform(({ value }) =>
    value?.map((subject: SubjectEntity) =>
      plainToInstance(SubjectRdo, subject),
    ),
  )
  readonly subjects: SubjectRdo[];

  readonly education?: string;

  readonly answersCount: number;

  readonly questionsCount: number;

  readonly answerSpeed?: number;
}
