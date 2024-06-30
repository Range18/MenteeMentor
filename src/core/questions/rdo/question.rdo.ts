import { SubjectRdo } from '#src/core/subjects/rdo/subject.rdo';
import { ThemeRdo } from '#src/core/subjects/themes/rdo/theme.rdo';
import { plainToInstance, Transform } from 'class-transformer';
import { GetUserRdo } from '#src/core/users/rdo/get-user.rdo';

export class QuestionRdo {
  readonly id: string;

  readonly title: string;

  readonly description: string;

  @Transform(({ value }) => plainToInstance(GetUserRdo, value))
  readonly userCreated: GetUserRdo;

  @Transform(({ value }) => plainToInstance(SubjectRdo, value))
  readonly subject: SubjectRdo;

  @Transform(({ value }) => plainToInstance(ThemeRdo, value))
  readonly theme: ThemeRdo;

  readonly timeToAnswer: string;

  readonly answerFormat: string;

  readonly duration: number;

  readonly tickets: number;

  readonly coins: number;

  readonly isFirst: boolean;

  readonly createdAt: Date;

  readonly updatedAt: Date;
}
