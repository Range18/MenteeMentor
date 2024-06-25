import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '#src/common/decorators/guards/auth-guard.decorator';
import { IsVerifiedGuard } from '#src/common/decorators/guards/is-verified-guard.decorator';

@ApiTags('Questions')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @IsVerifiedGuard()
  @AuthGuard()
  @Post()
  async create(@Body() createQuestionDto: CreateQuestionDto) {
    return await this.questionsService.save(createQuestionDto);
  }

  @Get()
  async findAll() {
    return await this.questionsService.find({});
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.questionsService.findOne({ where: { id } });
  }

  @IsVerifiedGuard()
  @AuthGuard()
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return await this.questionsService.updateOne(
      { where: { id } },
      updateQuestionDto,
    );
  }

  @IsVerifiedGuard()
  @AuthGuard()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.questionsService.removeOne({ where: { id } });
  }
}
