import { Controller, Get, Param, Query } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { ThemeService } from '#src/core/subjects/themes/theme.service';
import { GetThemeQuery } from '#src/core/subjects/themes/dto/get-theme.query';
import { ThemeRdo } from '#src/core/subjects/themes/rdo/theme.rdo';

@ApiTags('Themes')
@Controller('themes')
export class ThemeController {
  constructor(private readonly themeService: ThemeService) {}

  @Get()
  async findAll(@Query() query: GetThemeQuery): Promise<ThemeRdo[]> {
    return this.themeService.formatToRdo(
      await this.themeService.find({
        where: { subject: { name: query.subject } },
      }),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ThemeRdo> {
    return this.themeService.formatToRdo(
      await this.themeService.findOne({ where: { id } }),
    );
  }
}
