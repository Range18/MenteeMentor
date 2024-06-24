import { Controller, Get, Param } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { ApiTags } from '@nestjs/swagger';
import { SubjectRdo } from '#src/core/subjects/rdo/subject.rdo';

@ApiTags('Subjects')
@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Get()
  async findAll(): Promise<SubjectRdo[]> {
    return this.subjectsService.formatToRdo(
      await this.subjectsService.find({}),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<SubjectRdo> {
    return this.subjectsService.formatToRdo(
      await this.subjectsService.findOne({ where: { id: id } }),
    );
  }
}
