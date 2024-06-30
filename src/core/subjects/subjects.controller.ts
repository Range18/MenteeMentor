import { Controller, Get, Param, Query } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { ApiTags } from '@nestjs/swagger';
import { SubjectRdo } from '#src/core/subjects/rdo/subject.rdo';
import { GetSubjectQuery } from '#src/core/subjects/dto/get-subject.query';

@ApiTags('Subjects')
@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Get()
  async findAll(@Query() query: GetSubjectQuery): Promise<SubjectRdo[]> {
    return this.subjectsService.formatToRdo(
      await this.subjectsService.find({
        where: { isLanguage: query.isLanguage },
        relations: { themes: true },
      }),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<SubjectRdo> {
    return this.subjectsService.formatToRdo(
      await this.subjectsService.findOne({
        where: { id: id },
        relations: { themes: true },
      }),
    );
  }
}
