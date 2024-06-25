import { Controller, Get, Param, Query } from '@nestjs/common';
import { TagsService } from './tags.service';
import { ApiTags } from '@nestjs/swagger';
import { GetTagDto } from '#src/core/subjects/tags/dto/get-tag.dto';

@ApiTags('Tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  async findAll(@Query() query: GetTagDto) {
    return await this.tagsService.find({});
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.tagsService.findOne({ where: { id } });
  }
}
