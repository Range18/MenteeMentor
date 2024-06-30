import { ThemeEntity } from '#src/core/subjects/themes/entities/theme.entity';
import { plainToInstance, Transform } from 'class-transformer';
import { ThemeRdo } from '#src/core/subjects/themes/rdo/theme.rdo';

export class SubjectRdo {
  readonly id: number;

  readonly name: string;

  @Transform(({ value }) =>
    value?.map((theme: ThemeEntity) => plainToInstance(ThemeRdo, theme)),
  )
  readonly themes?: ThemeRdo[];
}
