import { Controller, Get, Param } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { ApiTags } from '@nestjs/swagger';
import { LanguageRdo } from '#src/core/languages/rdo/language.rdo';

@ApiTags('Languages')
@Controller('languages')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @Get()
  async findAll(): Promise<LanguageRdo[]> {
    return this.languagesService.formatToRdo(
      await this.languagesService.find({}),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<LanguageRdo> {
    return this.languagesService.formatToRdo(
      await this.languagesService.findOne({ where: { id: id } }),
    );
  }
}
