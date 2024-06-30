import { Module } from '@nestjs/common';
import { ThemeModule } from '#src/core/subjects/themes/theme.module';
import { SubjectsModule } from '#src/core/subjects/subjects.module';

@Module({
  imports: [ThemeModule, SubjectsModule],
  exports: [ThemeModule, SubjectsModule],
})
export class SubjectMainModule {}
