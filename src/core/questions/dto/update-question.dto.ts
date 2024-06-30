import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TimeToAnswerType } from '#src/core/questions/types/time-to-answer.type';
import { AnswerFormatType } from '#src/core/questions/types/answer-format.type';

export class UpdateQuestionDto {
  @IsString()
  @IsOptional()
  readonly title?: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsNumber()
  @IsOptional()
  readonly subjectId?: number;

  @IsNumber()
  @IsOptional()
  readonly themeId?: number;

  @ApiProperty({ examples: TimeToAnswerType })
  @IsString()
  @IsOptional()
  readonly timeToAnswer?: string;

  @ApiProperty({ examples: AnswerFormatType })
  @IsString()
  @IsOptional()
  readonly answerFormat?: string;

  @IsPositive()
  @IsNumber()
  @IsOptional()
  readonly duration?: number;
}
