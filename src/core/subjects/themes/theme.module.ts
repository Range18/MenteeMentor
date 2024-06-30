import { Module } from '@nestjs/common';
import { ThemeService } from './theme.service';
import { ThemeController } from './theme.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThemeEntity } from '#src/core/subjects/themes/entities/theme.entity';
import { QuestionEntity } from '#src/core/questions/entities/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ThemeEntity, QuestionEntity])],
  controllers: [ThemeController],
  providers: [ThemeService],
})
export class ThemeModule {}
