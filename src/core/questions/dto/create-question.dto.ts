import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AnswerFormatType } from '#src/core/questions/types/answer-format.type';
import { TimeToAnswerType } from '#src/core/questions/types/time-to-answer.type';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  readonly subjectId: number;

  @IsNumber()
  @IsNotEmpty()
  readonly themeId: number;

  @ApiProperty({ examples: TimeToAnswerType })
  @IsString()
  @IsNotEmpty()
  readonly timeToAnswer: string;

  @ApiProperty({ examples: AnswerFormatType })
  @IsString()
  @IsNotEmpty()
  readonly answerFormat: string;

  @IsPositive()
  @IsNumber()
  @IsNotEmpty()
  readonly duration: number;

  @IsPositive()
  @IsNumber()
  @IsNotEmpty()
  readonly tickets: number;

  @IsNumber()
  @IsNotEmpty()
  readonly coins: number;
}
