import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectEntity } from '#src/core/subjects/entities/subject.entity';
import { ThemeModule } from '#src/core/subjects/themes/theme.module';

@Module({
  imports: [TypeOrmModule.forFeature([SubjectEntity]), ThemeModule],
  controllers: [SubjectsController],
  providers: [SubjectsService],
  exports: [SubjectsService],
})
export class SubjectsModule {}
